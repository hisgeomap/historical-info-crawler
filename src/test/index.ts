import { ChineseEraWikiProcessor } from "../processor/WikiProcessor";
import * as fs from "fs";

// generating data
new ChineseEraWikiProcessor(data => {
    let str = "";
    data.forEach(e => {
        str += JSON.stringify(e) + "\n";
    });
    fs.writeFile("./data/era.json", str, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});
