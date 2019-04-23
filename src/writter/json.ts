import * as fs from "fs";

export function WriteArrayOneObjectPerRow(data: any[], filename) {
    let str = "";
    data.forEach(e => {
        str += JSON.stringify(e) + "\n";
    });
    fs.writeFile(`./data/${filename}.json`, str, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log(`The file ${filename}.json saved!`);
    });
}

export function WriteObjectOneKeyPerRow(data, filename) {
    const arr = [];
    Object.keys(data).forEach(e => {
        const a = {};
        a[e] = data[e];
        arr.push(a);
    });
    WriteArrayOneObjectPerRow(arr, filename);
}
