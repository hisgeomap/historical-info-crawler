# historical-info-crawler

historical-info-crawler is an Open Source TypeScript Crawler which provides interfaces for crawling and formatting on online historical data. User can easily use interfaces to get formatted historical data from Wikipedia and other online resources.  

### Quick Start
User can use any supported Processer to crawl data by passing the callback function for processing data when constructing the processor.<br/><br/>
Here is an example of use ChineseEraWikiProcessor to generate a JSON file with each row being a JSON object.
```javascript
import { ChineseEraWikiProcessor } from '<PATH_OF_SRC_DIR>/processor/WikiProcessor';
import { WriteArrayOneObjectPerRow } from "<PATH_OF_SRC_DIR>/writter/json";

// generating data
new ChineseEraWikiProcessor(data => {
     WriteArrayOneObjectPerRow(data, "ChineseEraWikiProcessor");
});
```

### Currently Supported Processor and Manager
- ChineseEraWikiProcessor - Chinese Historical Era for Wikipedia ( https://zh.wikipedia.org/zh-cn/中国年号列表 )
- ChineseEmperorWikiProcessor - Chinese Historical Emperor for Wikipedia ( https://zh.wikipedia.org/zh-cn/中国君主列表 )
- TimeManager - Chinese historical Era and Emerpror Timeline 


### Main Goal
historical-info-crawler is used to provides data-level support for hisgeomap system. historical-info-crawler should take good online data sources as input and output formatted data that can be easily used in hisgeomap system. historical-info-crawler should focus on the parsing and formatting of different table data, extensibility of different languages, I/O library support for data and design of standard struture for formatted data.
