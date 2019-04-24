import {
    ChineseEraWikiProcessor,
    ChineseEmperorWikiProcessor
} from "../processor/WikiProcessor";
import { TimeManager } from "../manager/TimeManager";
import {
    WriteObjectOneKeyPerRow,
    WriteArrayOneObjectPerRow
} from "../writter/json";
import { TimePieceManager } from "../manager/TimePieceManager";

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
    const manager = new TimePieceManager(leaderData, eraData);
    manager.data.sort((a, b) => {
        return a.start - b.start;
    });
    WriteArrayOneObjectPerRow(manager.data, "TimePieceManager");
});
