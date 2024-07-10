import { department } from "../model/department.js";
import { employee } from "../model/employee.js";
import { role } from "../model/role.js";
import { color } from "../util/color.js";

/** Variable naming for all menu items to 
 *  cut down on verbosity and minimize typo
*/
const DEPT_ADD = "Add a Department";
const DEPT_DEL = "Delete a Department";
const DEPT_BUDGET = "View Department Budget";
const DEPT_ALL = "View all Departments";
const ROLE_ADD = "Add a Role";
const ROLE_DEL = "Delete a Role";
const ROLE_ALL = "View All Roles";
const EMP_ADD = "Add an Employee";
const EMP_DEL = "Delete an Employee";
const EMP_UPDATE_ROLE = "Update Employee Role";
const EMP_UPDATE_MGR = "Update Employee Manager";
const EMP_ALL = "View All Employees";
const EMP_BY_MGR = "View Employees by Manager";
const EMP_BY_DEPT = "View Employees by Department";
const QUIT = "-- Quit --";

/** List options for the main menu */
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
  QUIT,
];

/**
 * All of the questions for the application in order of
 * use. Condition determines if the question will display message (if provided)
 * or run the action (if provided), and then next is used to determine
 * where to go next
 */
export const QUESTIONS = {
    //the main menu display list options
  1: {
    condition: () => true,
    question: {
      type: "list",
      name: "mainChoice",
      message: "Main Menu",
      choices: menOpts,
    },
    action: null,
    next: 2,
  },
  //View all departments
  2: {
    condition: ({ mainChoice }) => mainChoice === DEPT_ALL,
    question: null,
    action: async () => {
      try {
        await department.viewAll();
      } catch (err) {
        color.error(err);
      }
    },
    next: 1,
  },
  //Delete a department
  3: {
    condition: ({ mainChoice }) => mainChoice === DEPT_DEL,
    question: {
      message: "Which Department to delete? ...",
      type: "list",
      choices: department.getNames,
      name: "deptName",
    },
    action: async ({ deptName }) => {
      if (!deptName || deptName === "--none--") {
        color.warn("** no delete action to perform **");
      } else {
        try {
          await department.delete(deptName);
        } catch (err) {
          color.error(err);
        }
        deptName = null;
      }
    },
    next: 1,
  },
  //Add a department
  4: {
    condition: ({ mainChoice }) => mainChoice === DEPT_ADD,
    question: {
      message: "Enter a Department Name ...",
      name: "deptName",
      type: "input",
      validate: (value) =>
        value.length < 1 ? "Invalid Department Name" : true,
    },
    action: ({ deptName }) => {
      console.log(
        `${deptName ? "" : "Not "}Adding ${deptName} to the database`
      );
      department.create(deptName);
      deptName = null;
    },
    next: 1,
  },
  //Add a role
  5: {
    condition: (response) => response.mainChoice === ROLE_ADD,
    question: [
      {
        message: "Enter a Role name ...",
        type: "input",
        name: "roleName",
        validate: (value) => (value.length < 1 ? "Invalid Role Name" : true),
      },
      {
        message: "Enter a Salary ...",
        type: "number",
        name: "salary",
      },
      {
        message: "Select a Department ...",
        type: "list",
        name: "selRoleDept",
        choices: department.getNames,
      },
    ],
    action: async ({ salary, selRoleDept, roleName }) => {
      if (!salary || !selRoleDept || !roleName) {
        color.warn("** no role to add because missing input requirements **");
      } else {
        try {
          const res = await role.create(roleName, salary, selRoleDept);
          color.success(`Added role [${roleName}]`);
        } catch (err) {
          color.error(err);
        }
      }
    },
    next: 1,
  },
  //Delete a role
  6: {
    condition: ({ mainChoice }) => mainChoice === ROLE_DEL,
    question: {
      message: "Select a role to delete ...",
      type: "list",
      choices: role.getNames,
      name: "roleName",
    },
    action: async ({ roleName }) => {
      if (!roleName || roleName === "--none--") {
        color.warn("** no delete action to perform **");
      } else {
        await role.delete(roleName);
        roleName = null;
      }
    },
    next: 1,
  },
  //View all roles
  7: {
    condition: ({ mainChoice }) => mainChoice === ROLE_ALL,
    question: null,
    action: async () => {
      try {
        const res = await role.getAll();
        role.print(ROLE_ALL, res);
      } catch (err) {
        color.error(err);
      }
    },
    next: 1,
  },
  //Add an Employee
  8: {
    condition: ({ mainChoice }) => mainChoice === EMP_ADD,
    question: [
      {
        message: "Enter a First Name ...",
        name: "firstName",
        type: "input",
        validate: (value) =>
          value.length < 1 || value.length > 30
            ? "Name should be no more than 30 chars and more than one"
            : true,
      },
      {
        message: "Enter a Last Name ...",
        name: "lastName",
        type: "input",
        validate: (value) =>
          value.length < 1 || value.length > 30
            ? "Name should be no more than 30 chars and more than one"
            : true,
      },
      {
        message: "Select a Role ...",
        type: "list",
        name: "selRoleEmp",
        choices: role.getNames,
      },
      {
        message: "Select a Manager ...",
        type: "list",
        name: "selMgrEmp",
        choices: employee.getNames,
      },
    ],
    action: async ({ firstName, lastName, selMgrEmp, selRoleEmp }) => {
      try {
        await employee.create(firstName, lastName, selRoleEmp, selMgrEmp);
        color.success(`Added employee [${firstName} ${lastName}]`);
      } catch (err) {
        color.error(`unable to create employee: ${err}`);
      }
    },
    next: 1,
  },
  //View all employees
  9: {
    condition: ({ mainChoice }) => mainChoice === EMP_ALL,
    question: null,
    action: async () => {
      try {
        await employee.viewAll()
      } catch (err) {
        color.error(err);
      }
    },
    next: 1,
  },
  //Delete an employee
  10: {
    condition: ({ mainChoice }) => mainChoice === EMP_DEL,
    question: {
      message: "Select an employee to delete ...",
      type: "list",
      choices: employee.getNames,
      name: "employeeName",
    },
    action: async ({ employeeName }) => {
      if (!employeeName || employeeName === "--none--") {
        color.warn("** no delete action to perform **");
      } else {
        await employee.delete(employeeName);
        employeeName = null;
      }
    },
    next: 1,
  },
  //Update an employee's role
  11: {
    condition: ({ mainChoice }) => mainChoice === EMP_UPDATE_ROLE,
    question: [{
      message: "Select an employee to update ...",
      type: "list",
      choices: employee.getNames,
      name: "employeeName",
    },
    {
        message: "select a new role", 
        type: "list", 
        choices: role.getNames,
        name: 'employeeRole'
    }],
    action: async ({ employeeName, employeeRole }) => {
      if (!employeeName || employeeName === "--none--" || !employeeRole || employeeRole === '--none--') {
        color.warn("** --none-- is a placeholder. Select an actual value to proceed **");
      } else {
        const rid = await role.getIdByName(employeeRole);
        await employee.updateRole(employeeName, rid);
      }
    },
    next: 1,
  },
  //Update an employee's manager
  12: {
    condition: ({ mainChoice }) => mainChoice === EMP_UPDATE_MGR,
    question: [{
      message: "Select an employee to update ...",
      type: "list",
      choices: employee.getNames,
      name: "employeeName",
    },
    {
        message: "select a manager", 
        type: "list", 
        choices: employee.getNames,
        name: 'empMgr'
    }],
    action: async ({ employeeName, empMgr }) => {
      if (!employeeName || employeeName === "--none--" || !empMgr || empMgr === '--none--') {
        color.warn("** --none-- is a placeholder. Select an actual value to proceed **");
      } else {
        await employee.updateManager(employeeName, empMgr);
      }
    },
    next: 1,
  },
  // View employee by department
  13: {
    condition: ({ mainChoice }) => mainChoice === EMP_BY_DEPT,
    question: null,

    action: async () => {

        await employee.viewByDepartment();
    },
    next: 1,
  },
  //View employee by manager
  14: {
    condition: ({ mainChoice }) => mainChoice === EMP_BY_MGR,
    question: null,

    action: async () => {

        await employee.viewByManager();
    },
    next: 1,
  },
  15: {
    condition: ({mainChoice}) => mainChoice === DEPT_BUDGET,
    question: null,
    action: async () => {
        await department.viewBudget();
    }
  },
  //exit the program
  16: {
    condition: ({ mainChoice }) => mainChoice === QUIT,
    question: null,
    action: null,
    next: -200,
  },
  17: {
    condition: () => true,
    question: null,
    action: null,
    next: -200,
  },
};
