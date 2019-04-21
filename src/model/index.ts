export class Era {
    regime: string;
    name: string;
    start: number;
    startHD: number;
    end: number;
    endHD: number;
    duration: number;
}

export class Leader {
    regime: string;
    start: number;
    end: number;
    name: string;
    prefix: string;
}

export class EraBuilder {
    formatter;
    element;

    constructor(formatter) {
        this.formatter = formatter;
    }
    build(
        regimeStr: string,
        nameStr: string,
        durationStr: string,
        rangeStr: string
    ) {
        this.element = new Era();
        this.regimeStr = regimeStr;
        this.nameStr = nameStr;
        this.durationStr = durationStr;
        this.rangeStr = rangeStr;
        return this.element;
    }

    set regimeStr(regimeStr: string) {
        this.element.regime = this.formatter.decodeRegime(regimeStr);
    }
    set nameStr(nameStr: string) {
        this.element.name = this.formatter.decodeName(nameStr);
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

    build(regimeStr: string, prefix: string, name: string, rangeStr: string) {
        this.element = new Leader();
        this.regimeStr = regimeStr;
        this.prefix = prefix;
        this.name = name;
        this.rangeStr = rangeStr;
        return this.element;
    }

    set regimeStr(regimeStr: string) {
        this.element.regime = this.formatter.decodeRegime(regimeStr);
    }

    set prefix(prefix: string) {
        this.element.prefix = prefix;
    }

    set name(name: string) {
        this.element.name = name;
    }

    set rangeStr(rangeStr: string) {
        const range = this.formatter.decodeRange(rangeStr);
        if (range) {
            this.element.start = range[0];
            this.element.end = range[1];
        }
    }
}
