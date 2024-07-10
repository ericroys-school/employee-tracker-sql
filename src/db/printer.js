import { color } from "../util/color.js";

/**
 * Prints the query result in table format
 * @param {rows, fields} queryResult 
 * @param {string} sep (optional)
 * @param  {...number} widths (optional)
 * @returns 
 */
export const print = ({rows, fields}, sep, ...widths) => {
    if(!rows || !fields) return;
    if(widths.length > 0 && fields.length !== widths.length){
        throw "Field width specification doesn't match the number of fields";
    }
    //set defaults
    const defWidth = 40;
    const separator = sep ? sep : "\t";
    
    console.log();
    //print the column headers
    color.statistics(fields.map((field, i) => field.name.padEnd(widths[i] || defWidth, " ")).join(separator))
    //print the happy dash header row separator
    color.statistics(fields.map((field, i) => "-".repeat(widths[i] || defWidth)).join(separator))
    console.log()
    //print the column values
    rows.forEach(f => {
        let x = "";
        f.forEach((r, i) => {
            x += r ? r.padEnd(widths[i]||defWidth, " ") + separator
            : "".padEnd(widths[i]||defWidth, " ") + separator
        })
        color.statistics(x);
    });
    console.log("\n\n")
}