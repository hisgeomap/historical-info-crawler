import {
    Leader as LeaderNoSql,
    Era as EraNoSql,
    TimePiece
} from "../model/index";
import { ChineseWikiFormatter } from "../formatter/WikiFormatter";
export class TimePieceManager {
    data: TimePiece[];
    formatter;

    constructor(leaderData: LeaderNoSql[], eraData: EraNoSql[]) {
        this.data = [];
        this.formatter = new ChineseWikiFormatter(
            ChineseWikiFormatter.YEAR_STANDARD
        );
        const eraRepeated = eraData.map(e => false);

        // add leader as TimePiece to data
        // add era matching a leader as TimePiece to data
        leaderData.forEach((leader, i) => {
            if (leader.eras && leader.eras.length > 0) {
                eraData.forEach((era, i) => {
                    if (
                        leader.eras.indexOf(era.name) >= 0 &&
                        (era.start <= leader.end && era.end >= leader.start)
                    ) {
                        eraRepeated[i] = true;
                        this.data.push(
                            new TimePiece(era, leader, this.formatter)
                        );
                    }
                });
            }

            this.data.push(new TimePiece(null, leader, this.formatter));
        });

        // add era not matching any leader as TimePiece to data
        eraData.forEach((era, i) => {
            if (!eraRepeated[i]) {
                this.data.push(new TimePiece(era, null, this.formatter));
            }
        });
    }
}
