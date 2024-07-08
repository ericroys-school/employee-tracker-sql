
export const print = ({rows, fields}, sep, ...widths) => {
    if(!rows || !fields) return;
    if(widths.length > 0 && fields.length !== widths.length){
        throw "Field width specification doesn't match the number of fields";
    }
    const defWidth = 40;
    const separator = sep ? sep : "\t";
    
    console.log();
    console.log(fields.map((field, i) => field.name.padEnd(widths[i] || defWidth, " ")).join(separator))
    console.log(fields.map((field, i) => "-".repeat(widths[i] || defWidth)).join(separator))
    console.log()
    rows.forEach(f => {
        let x = "";
        f.forEach((r, i) => {
            
            x += r.padEnd(widths[i]||defWidth, " ") + "\t";
        })
        console.log(x);
    });
    console.log("\n\n")
   
}