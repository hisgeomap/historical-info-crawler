import assert = require("assert");
import { Era } from "./Era";

export class Leader {
    regime: string;
    start: number;
    end: number;
    name: string;
    prefix: string[];
    eras: string[];

    translate(year) {
        assert(year >= this.start && year <= this.end);
        return this.regime + this.name + "在位第" + (year - this.start) + "年";
    }

    translateByEra(year, era: Era) {
        assert(year >= this.start && year <= this.end);
        assert(year >= era.start && year <= era.end);
        return (
            this.regime + this.name + era.name + (year - era.start + 1) + "年"
        );
    }
}

export class LeaderBuilder {
    formatter;
    element;

    constructor(formatter) {
        this.formatter = formatter;
    }

    build(
        regimeStr: string,
        prefixStr: string,
        nameStr: string,
        rangeStr: string,
        eraStr: string
    ) {
        this.element = new Leader();
        this.regimeStr = regimeStr;
        this.prefixStr = prefixStr;
        this.nameStr = nameStr;
        this.rangeStr = rangeStr;
        this.eraStr = eraStr;
        if (!(this.element.name && this.element.start && this.element.end)) {
            return null;
        }
        assert(this.element.name && this.element.start && this.element.end);
        return this.element;
    }

    set regimeStr(regimeStr: string) {
        this.element.regime = this.formatter.decodeRegime(regimeStr);
    }

    set prefixStr(prefixStr: string) {
        this.element.prefix = this.formatter.decodePrefix(prefixStr);
    }

    set nameStr(nameStr: string) {
        this.element.name = this.formatter.decodeName(nameStr);
    }

    set rangeStr(rangeStr: string) {
        const range = this.formatter.decodeRange(rangeStr);
        if (range) {
            this.element.start = range[0];
            this.element.end = range[1];
        }
    }

    set eraStr(eraStr: string) {
        const eras = this.formatter.decodeEras(eraStr);
        if (eras) {
            this.element.eras = eras;
        }
    }
}
