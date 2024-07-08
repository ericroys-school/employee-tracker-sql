
export const color = {
    error: (text) => console.log(`\x1b[91m ${text} \x1b[0m`),
    warn: (text) => console.log(`\x1b[93m ${text} \x1b[0m`),
    success: (text) => console.log(`\x1b[92m ${text} \x1b[0m`)
}