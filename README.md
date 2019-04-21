# historical-info-crawler

historical-info-crawler is an Open Source TypeScript Crawler which provides interfaces for crawling and formatting on online historical data. User can easily use interfaces to get formatted historical data from Wikipedia and other online resources.  

### Quick Start
User can use any supported Processer to crawl data by passing the callback function for processing data when constructing the processor.<br/><br/>
Here is an example of use ChineseEraWikiProcessor to generate a JSON file with each row being a JSON object.
```javascript
import {ChineseEraWikiProcessor} from 'historical-info-crawler';
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
```

### Supported Processor
- ChineseEraWikiProcessor - Chinese Historical Era for Wikipedia ( https://zh.wikipedia.org/zh-cn/中国年号列表 )

### Main Goal
historical-info-crawler is used to provides data-level support for hisgeomap system. historical-info-crawler should take good online data sources as input and output formatted data that can be easily used in hisgeomap system. historical-info-crawler should focus on the parsing and formatting of different table data, extensibility of different languages and design of standard struture for formatted data.
