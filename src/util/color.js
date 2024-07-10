/**
 * No fancy library to print in color, just some
 * of the basic colorings to promote better ui
 * experience
 */
export const color = {
    /**
     * prints text in red coloring
     * @param {*} text 
     * @returns 
     */
    error: (text) => print(text, '91'),
    /**
     * prints text in yellow/orange coloring
     * @param {*} text 
     * @returns 
     */
    warn: (text) => print(text, '93'),
    /**
     * prints text in greenish coloring
     * @param {*} text 
     * @returns 
     */
    success: (text) => print(text, '92'),
    /**
     * prints text in blueish coloring
     * @param {*} text 
     * @returns 
     */
    statistics: (text) => print(text, '96')
}

function print(text, color){
    console.log(`\x1b[${color}m ${text} \x1b[0m`)
}