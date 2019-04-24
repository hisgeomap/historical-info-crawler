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

export class TimePiece {
    regime: string;
    prefix: string;
    leader: string;
    era: string;
    start: number;
    end: number;
    from: number;

    constructor(era: Era, leader: Leader, formatter) {
        if (leader && era) {
            this.leader = leader.name;
            this.regime = leader.regime;

            assert(leader.prefix.length >= 0);
            this.prefix = formatter.properPrefix(leader);

            this.era = era.name;
            this.start = era.start > leader.start ? era.start : leader.start;
            this.end = era.end < leader.end ? era.end : leader.end;
            this.from = era.start > leader.start ? era.start - leader.start : 1;
        } else if (era) {
            this.regime = era.regime;
            this.leader = era.leader;
            this.prefix = "";
            this.era = era.name;
            this.start = era.start;
            this.end = era.end;
            this.from = 1;
        } else {
            this.regime = leader.regime;
            this.leader = leader.name;
            this.era = "";
            this.prefix = formatter.properPrefix(leader);
            this.start = leader.start;
            this.end = leader.end;
            this.from = 0;
        }
    }

    translate(year) {
        assert(year >= this.start && year <= this.end);
        return (
            this.regime +
            this.leader +
            this.era +
            (year - this.start + this.from) +
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
