import { getAnswers } from "./src/questions/qaReader.js";
import { color } from "./src/util/color.js";

console.clear();
color.statistics(
`${"*".repeat(50)}

\t\t Employee Manager

 ${"*".repeat(50)}
`);

await getAnswers();
console.log('Thanks for all the fish')
