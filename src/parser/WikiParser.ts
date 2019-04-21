import * as assert from "assert";

export class WikiTableStrictParser {
    $;

    constructor($) {
        this.$ = $;
    }

    getCaption(tableNode): string {
        const $ = this.$;
        let title;
        const caption = $(tableNode).children("caption");

        // looking for the prev element with useful infomation
        let prev = $(tableNode).prev();
        while (!prev.is("h2") && !prev.is("h3") && !prev.is("table")) {
            prev = $(prev).prev();
        }

        if (caption.length == 1) {
            // caption title
            title = $($(tableNode).children("caption")[0]).text();
        } else if (prev.is("h3")) {
            // h3 title
            title = prev.text();
        } else if (prev.is("h2")) {
            // h2 title
            title = prev.text();
        } else {
            // looking for h2 for this section
            while (!prev.is("h2")) {
                prev = $(prev).prev();
            }
            title = prev.text();
        }

        assert(title != null);

        return title;
    }

    parseToObject(tableNode, callback) {
        const $ = this.$;
        const rows = $(tableNode).find("tr");
        const data = [];

        // identify attr columns
        const attrs = [];
        const cols = $(rows[0]).find("th");
        for (let j = 0; j < cols.length; j++) {
            attrs.push($(cols[j]).text());
        }

        for (let j = 1; j < rows.length; j++) {
            const row = $(rows[j]).find("td");
            if (row.length == attrs.length) {
                callback(attrs, row);
            }
        }
    }
}
