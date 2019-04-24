import { Leader as LeaderNoSql, Era as EraNoSql } from "../model/index";

export class TimeManager {
    data;
    constructor(
        leaderData: LeaderNoSql[],
        eraData: EraNoSql[],
        startBC: number,
        endBC: number
    ) {
        this.data = {};
        for (let i = startBC; i <= endBC; i++) {
            // do not have year 0 BC
            if (i == 0) {
                continue;
            }

            // filter all era and leaders in this year
            const leaders = leaderData.filter(e => i >= e.start && i <= e.end);
            const eras = eraData.filter(e => i >= e.start && i <= e.end);
            const repeated = eras.map(e => false);

            // generate pool for this year
            this.data[i] = [];

            // add leader's translation of this year into data
            // add era(matching a leader)'s translation of this year into data
            leaders.forEach(leader => {
                eras.forEach((era, pos) => {
                    if (leader.eras.indexOf(era.name) >= 0) {
                        repeated[pos] = true;

                        this.data[i].push(leader.translateByEra(i, era));
                    }
                });

                this.data[i].push(leader.translate(i));
            });

            // add era(not matching any leader)'s translation of this year into data
            eras.forEach((e, pos) => {
                if (!repeated[pos]) {
                    this.data[i].push(e.translate(i));
                }
            });
        }
    }
}
