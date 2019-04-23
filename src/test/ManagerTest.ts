import {
    ChineseEraWikiProcessor,
    ChineseEmperorWikiProcessor
} from "../processor/WikiProcessor";
import { TimeManager } from "../manager/TimeManager";
import { WriteObjectOneKeyPerRow } from "../writter/json";

Promise.all([
    new Promise(resolve => {
        new ChineseEmperorWikiProcessor(data => {
            resolve(data);
        });
    }),
    new Promise(resolve => {
        new ChineseEraWikiProcessor(data => {
            resolve(data);
        });
    })
]).then(data => {
    const [leaderData, eraData] = data;
    const manager = new TimeManager(leaderData, eraData);
    WriteObjectOneKeyPerRow(manager.data, "TimeManager");
});
