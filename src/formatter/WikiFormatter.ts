import * as assert from "assert";

export class ChineseWikiFormatter {
    static YEAR_STANDARD = "YEAR";
    static MONTH_STANDARD = "MONTH";
    static DAY_STANDARD = "DAY";

    resolution = ChineseWikiFormatter.YEAR_STANDARD;

    constructor(resolution) {
        this.resolution = resolution;
    }

    decodeDuration(s: string): number {
        let str = s.replace(" ", "");
        if (this.checkNotExists(str) || this.checkNotSure(str)) {
            return null;
        }

        if (this.resolution === ChineseWikiFormatter.YEAR_STANDARD) {
            return this.decodeDurationYear(str);
        }

        return null;
    }

    decodeDurationYear(year: string): number {
        const cutPos = year.indexOf("年");
        if (cutPos != -1) {
            return parseInt(year.replace("前", "-").substr(0, cutPos));
        }
        return 0;
    }

    decodeRange(s: string): number[] {
        const range = [];
        let years = s.replace(" ", "").split("—");

        years = years.length > 2 ? [years[0], years[1]] : years;
        assert(years.length > 0 && years.length <= 2);

        for (let i = 0; i < years.length; i++) {
            if (this.resolution === ChineseWikiFormatter.YEAR_STANDARD) {
                range.push(this.decodeDuration(years[i]));
                if (range[i] == 0 && years[i].indexOf("年") == -1) {
                    range.pop();
                }
            }
        }

        if (range.length == 1) {
            range.push(range[0]);
        }

        if (range[0] === null || range[1] === null) {
            return null;
        }

        return range;
    }

    decodeName(s: string): string {
        return s == "？？" ? null : s;
    }

    decodeRegime(s: string): string {
        if (
            s.indexOf("的") == -1 &&
            s.indexOf("势力") == -1 &&
            s.indexOf("待考") == -1
        )
            return s.replace(/\[.*?\]|年号|朝|\（.*?\）/g, "");
    }

    checkNotExists(s: string): boolean {
        return s === "-";
    }

    checkNotSure(s: string): boolean {
        return s === "?";
    }

    stringWithoutSpace(s: string): string {
        return s.replace(/\r?\n|\r/g, "");
    }
}
