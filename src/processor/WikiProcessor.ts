import { WikiTableStrictParser } from "../parser/WikiParser";
import { ChineseWikiFormatter } from "../formatter/WikiFormatter";
import * as Crawler from "crawler";
import * as assert from "assert";
import { EraBuilder } from "../model";
import { ChineseWikiSource } from "../sources/WikiSource";

export class ChineseEraWikiProcessor {
    wikiCrawler;

    constructor(callback) {
        this.wikiCrawler = new Crawler({
            maxConnections: 10,
            // This will be called for each crawled page
            callback: (error, res, done) => {
                if (error) {
                    console.log(error);
                } else {
                    const $ = res.$;

                    const tables = $(".wikitable");
                    const wikiTableParser = new WikiTableStrictParser($);
                    const wikiFormatter = new ChineseWikiFormatter(
                        ChineseWikiFormatter.YEAR_STANDARD
                    );
                    const eraBuilder = new EraBuilder(wikiFormatter);

                    const data = [];
                    for (let i = 0; i < tables.length; i++) {
                        const caption = wikiFormatter.stringWithoutSpace(
                            wikiTableParser.getCaption(tables[i])
                        );
                        wikiTableParser.parseToObject(
                            tables[i],
                            (attrs, row) => {
                                const e = {};
                                for (let k = 0; k < row.length; k++) {
                                    e[
                                        wikiFormatter.stringWithoutSpace(
                                            attrs[k]
                                        )
                                    ] = $(row[k]).text();
                                }
                                const duration = e["使用时间"]
                                    ? e["使用时间"]
                                    : e["使用时长"];
                                const name = e["年号"] ? e["年号"] : e["纪年"];
                                const range = e["起讫时间"];

                                if (!(duration && name && range)) {
                                    return null;
                                }
                                assert(duration && name && range);
                                data.push(
                                    eraBuilder.build(
                                        caption,
                                        name,
                                        duration,
                                        range
                                    )
                                );
                            }
                        );
                    }

                    callback(data);
                }
                done();
            }
        });
        ChineseWikiSource.souce_of_era.forEach(e =>
            this.wikiCrawler.queue(encodeURI(e))
        );
    }
}
