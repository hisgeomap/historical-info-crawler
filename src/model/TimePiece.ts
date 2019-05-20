import assert = require("assert");
import { Era } from "./Era";
import { Leader } from "./Leader";

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
            this.from =
                era.start < leader.start ? leader.start - era.start + 1 : 1;
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
