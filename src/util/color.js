
export const color = {
    error: (text) => print(text, '91'),
    warn: (text) => print(text, '93'),
    success: (text) => print(text, '92'),
    statistics: (text) => print(text, '96')
}

function print(text, color){
    console.log(`\x1b[${color}m ${text} \x1b[0m`)
}