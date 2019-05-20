import * as Crawler from "crawler";
import { GoogleParser } from "../parser/GoogleParse";

class Processor {
    parser;
    formatter;
    crawler;
    source;
    builder;
    _callback: Function;
}

export class GoogleSearchResultsNumProcessor extends Processor {
    parser = new GoogleParser();
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

    source = [
        "https://www.google.com/search?source=hp&ei=8O7hXMHmG7fE0PEPvvSZ4A8&q=%s&oq=%s&gs_l=psy-ab.12..0l10.2145.7507..7737...7.0..1.158.1497.10j5......0....1..gws-wiz.....6..35i39j0i12j0i203j0i10i203.0MlAk3QUWt4"
    ];

    constructor(data, callback) {
        super();
        this._callback = callback;
        data.forEach(i => {
            this.source.forEach(e => {
                this.crawler.queue(encodeURI(e.replace(/%s+/g, i)));
            });
        });
    }

    process = $ => {
        const result = this.parser.parseSearchResults($);
        return result;
    };
}

export class GoogleSearchResultsNumProcessorTest {
    constructor() {
        new GoogleSearchResultsNumProcessor(["南郡", "公安县"], data => {
            console.log(data);
        });
    }
}
