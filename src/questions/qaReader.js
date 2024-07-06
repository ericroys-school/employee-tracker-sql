import inquirer from "inquirer";
import { QUESTIONS } from "./qaModel.js";

/**
 * Call the Q&A logic to ask the user questions in
 * required order/condition
 * @returns {} answers to the questions
 */
export async function getAnswers() {
  let len = Object.keys(QUESTIONS).length;
  let response = {};

  //iterate the questions
  let i = 1;
  while(i > 0){
    // console.log(`i=${i}, condition = ${QUESTIONS[i].condition}, question = ${JSON.stringify(QUESTIONS[i].question)}`)
    // console.log( QUESTIONS[i].condition(response))

    //add answer to the response only run if the question condition is true
    if (QUESTIONS[i].condition(response)) {
        // console.log("****: " + QUESTIONS[i].question.message)
      if (QUESTIONS[i].question) {
        response = {
          ...response,
          ...(await inquirer.prompt(QUESTIONS[i].question)),
        };
      }
      //do the action
      if (QUESTIONS[i].action) QUESTIONS[i].action(response);

    //    console.log(`i=${i}, ${QUESTIONS[i].next}`);
      // this provides sequencing for skipping past the conditionals
      i = QUESTIONS[i].next;
    } else {
        // console.log("incrementing")
        i++;
    }
    //console.log(response)
}
  return response;
}

getAnswers();
