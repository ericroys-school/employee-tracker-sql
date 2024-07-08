import { department } from "../model/department.js";
import { role } from "../model/role.js";
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
            message: 'Main Menu',
            choices: menOpts
        },
        action: null,
        next: 2
    },
    2: {
        condition: ({mainChoice}) => mainChoice === DEPT_ALL,
        question: null,
        action: async ()=>{
            await department.getAll().then(res => department.print(DEPT_ALL, res)).catch(err => color.error(err));
        },
        next: 1
    },
    3: {
        condition: ({mainChoice}) => mainChoice === DEPT_DEL,
        question: {
            message: "Which Department to delete? ...",
            type: 'list',
            choices: department.getNames,
            name: 'deptName'
        },
        action: async ({deptName})=>{
            if(!deptName || deptName === '--none--'){
             color.warn("** no delete action to perform **")
            }
            else{
                await department.delete(deptName);
                deptName = null
            }
        },
        next: 1
    },
    4: {
        condition: ({mainChoice}) => mainChoice === DEPT_ADD,
        question: {
            message: "Enter a Department Name ...",
            name: 'deptName',
            type: 'input',
            validate: (value) => 
                value.length < 1 ? "Invalid Department Name" : true,
        },
        action: ({deptName}) => {
            console.log(`${deptName ? "" : "Not "}Adding ${deptName} to the database`);
            department.create(deptName);
            response.deptName = null
        },
        next: 1
    },
    5: {
        condition: (response) => response.mainChoice === ROLE_ADD,
        question: [{
            message: 'Enter a Role name ...',
            type: 'input',
            name: 'roleName',
            validate: (value) => 
                value.length < 1 ? "Invalid Role Name" : true,
        },
        {
            message: 'Enter a Salary ...',
            type: 'number', 
            name: 'salary',
        },
        {
            message: 'Select a Department ...',
            type: 'list', 
            name: 'selRoleDept',
            choices: department.getNames
        }],
        action: async ({salary, selRoleDept, roleName})=>{
            if(!salary || !selRoleDept || !roleName){
             color.warn("** no role to add because missing input requirements **")
            }
            else{
                await role.create(roleName, salary, selRoleDept).then(color.success(`Added role [${roleName}]`)).catch(err => color.error(err));
            }
        },
        next: 1

    },
    6: {
        condition: ({mainChoice}) => mainChoice === ROLE_DEL,
        question: {
            message: 'Select a role to delete ...',
            type: 'list', 
            choices: role.getNames,
            name: 'roleName'
        },
        action: async ({roleName})=>{
            if(!roleName || roleName === '--none--'){
             color.warn("** no delete action to perform **")
            }
            else{
                await role.delete(roleName);
                roleName = null
            }
        },
        next: 1
    },
    7: {
        condition: ({mainChoice}) => mainChoice === ROLE_ALL,
        question: null,
        action: async ()=>{
            await role.getAll().then(res => role.print(ROLE_ALL, res)).catch(err => color.error(err));
        },
        next: 1
    },    
    15: {
        condition: ({mainChoice}) => mainChoice === 'quit',
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