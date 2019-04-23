import {
    ChineseEmperorWikiProcessor,
    ChineseEraWikiProcessor
} from "../processor/WikiProcessor";
import { WriteArrayOneObjectPerRow } from "../writter/JSON";

new ChineseEmperorWikiProcessor(data => {
    WriteArrayOneObjectPerRow(data, "ChineseEmperorWikiProcessor");
});

new ChineseEraWikiProcessor(data => {
    WriteArrayOneObjectPerRow(data, "ChineseEraWikiProcessor");
});
