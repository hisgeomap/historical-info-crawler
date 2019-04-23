import * as assert from "assert";

export class WikiTableStrictParser {
    $;

    caption_option = {
        TH: "TH",
        CAPTION: "CAPTION",
        H2: "H2",
        H3: "H3",
        H4: "H4"
    };

    /**
     * Possible Place that has the caption
     * 1. <th> tag in the table
     * 2. caption of the table
     * 3. <h2> tag before the table
     * 4. <h3> tag before the table
     * @param caption_priority an array that defines the priority and also the factor contained
     */
    parse($, tableNode, caption_priority, callback) {
        const rows = $(tableNode).find("tr");
        // identify attr columns
        const attrs = [];
        const cols = $(rows[0]).find("th");
        for (let j = 0; j < cols.length; j++) {
            attrs.push($(cols[j]).text());
        }

        // caption
        let caption = $(tableNode).children("caption");
        caption = caption.length == 0 ? null : $(caption[0]).text();
        // h3
        let h3 = this.cloestPrevSiblingText($, tableNode, "h3", [
            "h2",
            "table"
        ]);
        // h4
        let h4 = this.cloestPrevSiblingText($, tableNode, "h4", [
            "h3",
            "table"
        ]);
        // h2
        let h2 = this.cloestPrevSiblingText($, tableNode, "h2", []);

        // get title
        let titles = {
            CAPTION: caption,
            H2: h2,
            H3: h3,
            H4: h4,
            TH: null
        };

        for (let j = 1; j < rows.length; j++) {
            const th = $(rows[j]).find("th");
            if (th.length === 1) {
                titles.TH = $(th[0]).text();
            }
            let title = "";
            for (let i = 0; i < caption_priority.length; i++) {
                if (titles[caption_priority[i]]) {
                    title = titles[caption_priority[i]];
                    break;
                }
            }

            const td = $(rows[j]).find("td");
            if (td.length == attrs.length) {
                const row = [];
                for (let i = 0; i < td.length; i++) {
                    row.push($(td[i]).text());
                }

                callback(title, attrs, row);
            }
        }
    }

    cloestPrevSiblingText($, node, selector, stop) {
        let prev = $(node).prev();
        while (prev.length > 0) {
            const canStop = stop.reduce(
                (accu, cur) => accu | $(prev[0]).is(cur),
                false
            );
            if (canStop) {
                break;
            }
            if ($(prev[0]).is(selector)) {
                return $(prev[0]).text();
            }
            prev = prev.prev();
        }

        return null;
    }
}
