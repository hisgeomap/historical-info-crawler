export class GoogleParser {
    parseSearchResults($) {
        const text = $("#resultStats")[0].children.filter(
            e => e.type == "text"
        )[0].data;

        // get number
        return text.replace(/,+/g, "").match(/\d+/)[0];
    }
}
