import { department } from "../model/department.js";
import { color } from "../util/color.js";

const DEPT_ADD = 'Add a Department';
const DEPT_DEL = 'Delete a Department';
const DEPT_BUDGET = 'View Department Budget';
const DEPT_ALL = 'View all Departments';
const ROLE_ADD = 'Add a Role';
const ROLE_DEL = 'Delete a Role';
const ROLE_ALL = 'View All Roles';
const EMP_ADD = 'Add an Employee';
const EMP_DEL = 'Delete an Employee';
const EMP_UPDATE_ROLE = 'Update Employee Role';
const EMP_UPDATE_MGR = 'Update Employee Manager';
const EMP_ALL = 'View All Employees';
const EMP_BY_MGR = 'View Employees by Manager'; 
const EMP_BY_DEPT = 'View Employees by Department';
const QUIT = 'quit';

const menOpts = [
   DEPT_ADD,
   DEPT_DEL,
   DEPT_ALL,
   DEPT_BUDGET,
   ROLE_ADD,
   ROLE_DEL,
   ROLE_ALL,
   EMP_ADD,
   EMP_DEL,
   EMP_ALL,
   EMP_UPDATE_MGR,
   EMP_UPDATE_ROLE,
   EMP_BY_DEPT,
   EMP_BY_MGR,
   QUIT
];

export const QUESTIONS = 
{
    1: {
        condition: ()=> true,
        question:
        {
            type: 'list',
            name: 'mainChoice',
            message: '\n\nMain Menu',
            choices: menOpts
        },
        action: null,
        next: 2
    },
    2: {
        condition: (response) => response.mainChoice === DEPT_ALL,
        question: null,
        action: ()=>{
            department.getAll().then(res => department.print(DEPT_ALL, res)).catch(err => console.error(err));
        },
        next: 1
    },
    3: {
        condition: (response) => response.mainChoice === DEPT_DEL,
        question: {
            message: "Which Department to delete? ",
            type: 'list',
            choices: department.getNames,
            name: 'deptName'
        },
        action:(response)=>{
            if(!response.deptName || response.deptName === '--none--'){
             color.warn("no delete action to perform")
            }
            else{
                console.log(`Deleting ${response.deptName} from the database`)
                department.delete(response.deptName);
                response.deptName = null
            }
        },
        next: 1
    },
    4: {
        condition: (response) => response.mainChoice === DEPT_ADD,
        question: {
            message: "Enter a Department Name",
            name: 'deptName',
            type: 'input',
            validate: (value) => 
                value.length < 1 ? "Invalid Department Name" : true,
        },
        action: (response) => {
            console.log(`${response.deptName ? "" : "Not "}Adding ${response.deptName} to the database`);
            department.create(response.deptName);
            response.deptName = null
        },
        next: 1
    },
    5: {
        condition: (response) => response.mainChoice === 'quit',
        question: null,
        action: null,
        next: -200
    },
    44: {
        condition: ()=> true,
        question: null,
        action: null,
        next: -200
    }
}