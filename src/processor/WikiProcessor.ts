import { WikiTableStrictParser } from "../parser/WikiParser";
import { ChineseWikiFormatter } from "../formatter/WikiFormatter";
import * as Crawler from "crawler";
import * as assert from "assert";
import { EraBuilder, LeaderBuilder } from "../model/index";
import { ChineseWikiSource } from "../sources/WikiSource";

class Processor {
    parser;
    formatter;
    crawler;
    source;
    builder;
    _callback: Function;

    Objectlize(attrs, row) {
        const e = {};
        for (let k = 0; k < row.length; k++) {
            e[
                this.formatter.stringWithoutSpace(attrs[k])
            ] = this.formatter.stringWithoutSpace(row[k]);
        }
        return e;
    }
}
export class ChineseEraWikiProcessor extends Processor {
    formatter = new ChineseWikiFormatter(ChineseWikiFormatter.YEAR_STANDARD);
    parser = new WikiTableStrictParser();
    crawler = new Crawler({
        maxConnections: 10,
        callback: (error, res, done) => {
            if (error) {
                console.log(error);
            } else {
                this._callback(this.process(res.$));
            }

            done();
        }
    });
    source = ChineseWikiSource.source_of_era;
    builder = new EraBuilder(this.formatter);

    constructor(callback) {
        super();
        this._callback = callback;
        this.source.forEach(e => this.crawler.queue(encodeURI(e)));
    }

    process = $ => {
        const tables = $(".wikitable");
        const data = [];
        for (let i = 0; i < tables.length; i++) {
            this.parser.parse(
                $,
                tables[i],
                [
                    this.parser.caption_option.H3,
                    this.parser.caption_option.CAPTION,
                    this.parser.caption_option.H2
                ],
                (caption, attrs, row) => {
                    // create object
                    const e = this.Objectlize(attrs, row);
                    // define parameter
                    const duration = e["使用时间"]
                        ? e["使用时间"]
                        : e["使用时长"];
                    const name = e["年号"] ? e["年号"] : e["纪年"];
                    const range = e["起讫时间"];
                    const leader = e["君主"];
                    if (!(duration && name && range)) {
                        return null;
                    }
                    assert(duration && name && range);

                    const element = this.builder.build(
                        caption,
                        leader,
                        name,
                        duration,
                        range
                    );
                    if (element) data.push(element);
                }
            );
        }
        return data;
    };
}

export class ChineseEmperorWikiProcessor extends Processor {
    formatter = new ChineseWikiFormatter(ChineseWikiFormatter.YEAR_STANDARD);
    parser = new WikiTableStrictParser();
    crawler = new Crawler({
        maxConnections: 10,
        callback: (error, res, done) => {
            if (error) {
                console.log(error);
            } else {
                this._callback(this.process(res.$));
            }

            done();
        }
    });
    source = ChineseWikiSource.source_of_emperor;
    builder = new LeaderBuilder(this.formatter);

    constructor(callback) {
        super();
        this._callback = callback;
        this.source.forEach(e => this.crawler.queue(encodeURI(e)));
    }

    process = $ => {
        const tables = $(".wikitable");
        const data = [];
        for (let i = 0; i < tables.length; i++) {
            this.parser.parse(
                $,
                tables[i],
                [
                    this.parser.caption_option.TH,
                    this.parser.caption_option.H4,
                    this.parser.caption_option.H3,
                    this.parser.caption_option.H2
                ],
                (caption, attrs, row) => {
                    // create object
                    const e = this.Objectlize(attrs, row);
                    // get parameter
                    const prefix = (() => {
                        let str = e["庙号"] ? e["庙号"] : "";
                        str = e["谥号"] ? str + " " + e["谥号"] : str;
                        str = e["世数"] ? str + " " + e["世数"] : str;
                        return str;
                    })();
                    const name = (() => {
                        if (e["姓名"]) return e["姓名"];
                        if (e["本名"]) return e["本名"];
                        return null;
                    })();
                    const range = (() => {
                        if (e["统治时间"]) return e["统治时间"];
                        if (e["统治时期"]) return e["统治时期"];
                        if (e["在位时期"]) return e["在位时期"];
                        return null;
                    })();
                    const era = (() => {
                        if (e["年号"]) return e["年号"];
                        if (e["年號"]) return e["年號"];
                        return "";
                    })();

                    if (!(name && range)) {
                        return null;
                    }

                    assert(name && range);
                    // build

                    const element = this.builder.build(
                        caption,
                        prefix,
                        name,
                        range,
                        era
                    );

                    if (element) {
                        data.push(element);
                    }
                }
            );
        }
        return data;
    };
}
