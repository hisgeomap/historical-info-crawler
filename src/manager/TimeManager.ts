import { Leader as LeaderNoSql, Era as EraNoSql } from "../model/index";

export class Era {
    regime: Regime;
    name: string;
    start: number;
    startHD: number;
    end: number;
    endHD: number;
    duration: number;
}

export class EraPiece {
    era: Era;
    start: number;
    end: number;
    from: number;
    to: number;
}

export class Regime {
    start: number;
    name: string;
}

export class Leader {
    eras: Era[];
    eraPieces: EraPiece[];
    regime: Regime;
    start: number;
    end: number;
    name: string;
    prefix: string[];
}

export class TimeManager {
    data;
    constructor(leaderData: LeaderNoSql[], eraData: EraNoSql[]) {
        // regime + leader + era
        const regimeSet = new Set();
        this.data = {};
        for (let i = -300; i <= 1911; i++) {
            if (i == 0) {
                continue;
            }

            // filter all era and leaders in this year
            const leaders = leaderData.filter(e => i >= e.start && i <= e.end);
            const eras = eraData.filter(e => i >= e.start && i <= e.end);
            const repeated = eras.map(e => false);

            // translate to proper string for each data
            this.data[i] = [];
            leaders.forEach(leader => {
                eras.forEach((era, pos) => {
                    if (leader.eras.indexOf(era.name) >= 0) {
                        repeated[pos] = true;

                        this.data[i].push(leader.translateByEra(i, era));
                    }
                });

                this.data[i].push(leader.translate(i));
            });
            eras.forEach((e, pos) => {
                if (!repeated[pos]) {
                    this.data[i].push(e.translate(i));
                }
            });
        }
    }
}
