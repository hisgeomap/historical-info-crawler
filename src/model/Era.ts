import assert = require("assert");
export class Era {
    leader: string;
    regime: string;
    name: string;
    start: number;
    startHD: number;
    end: number;
    endHD: number;
    duration: number;

    /**
     * return era's translation of the year
     * @param year the year to translate
     */
    translate(year) {
        assert(year >= this.start && year <= this.end);
        return (
            (this.regime ? this.regime : this.leader) +
            (this.name ? this.name : "") +
            (year - this.start + 1) +
            "年"
        );
    }
}

export class EraBuilder {
    formatter;
    element;

    constructor(formatter) {
        this.formatter = formatter;
    }

    /**
     * return a new instance of Era if all parameter is valid
     * return null if name or start or end is missing
     * @param regimeStr
     * @param leaderStr
     * @param nameStr
     * @param durationStr
     * @param rangeStr
     */
    build(
        regimeStr: string,
        leaderStr: string,
        nameStr: string,
        durationStr: string,
        rangeStr: string
    ) {
        this.element = new Era();
        this.regimeStr = regimeStr;
        this.leaderStr = leaderStr;
        this.nameStr = nameStr;
        this.durationStr = durationStr;
        this.rangeStr = rangeStr;

        if (!(this.element.name && this.element.start && this.element.end)) {
            return null;
        }
        assert(this.element.name && this.element.start && this.element.end);
        return this.element;
    }

    set regimeStr(regimeStr: string) {
        this.element.regime = this.formatter.decodeRegime(regimeStr);
    }
    set nameStr(nameStr: string) {
        this.element.name = this.formatter.decodeName(nameStr);
    }

    set leaderStr(leaderStr) {
        this.element.leader = leaderStr;
    }
    set durationStr(durationStr: string) {
        this.element.duration = this.formatter.decodeDuration(durationStr);
    }

    set rangeStr(rangeStr: string) {
        const range = this.formatter.decodeRange(rangeStr);
        if (range) {
            this.element.start = range[0];
            this.element.end = range[1];
        }
    }
}
