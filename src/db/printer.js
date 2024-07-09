import { color } from "../util/color.js";

export const print = ({rows, fields}, sep, ...widths) => {
    if(!rows || !fields) return;
    if(widths.length > 0 && fields.length !== widths.length){
        throw "Field width specification doesn't match the number of fields";
    }
    const defWidth = 40;
    const separator = sep ? sep : "\t";
    
    console.log();
    color.statistics(fields.map((field, i) => field.name.padEnd(widths[i] || defWidth, " ")).join(separator))
    color.statistics(fields.map((field, i) => "-".repeat(widths[i] || defWidth)).join(separator))
    console.log()
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