import { execute } from "../db/db.js";
import { role } from "./role.js";
import { color } from "../util/color.js";
import { print } from "../db/printer.js";

export const employee = {
  create: async (first, last, roleName, mgr) => {
    if (roleName === "--none--") {
      throw "--none-- is a placeholder. select a different value or add a new role if there is no other value";
    }
    const roleId = await role.getIdByName(roleName);
    if (!roleId) {
      color.error(`unable to get id for role [${roleName}]`);
      return;
    }
    let mid = null;
    if (mgr && mgr !== "--none--") {
      mid = await employee.getIdByName(mgr);
    }
    const query = {
      text: `insert into employee (first_name, last_name, role_id, manager_id) values ($1, $2, $3, $4)`,
      values: [first, last, roleId, mid],
    };
    return execute(query);
  },
  delete: async (name) => {
    if (!name) return;
    try {
      const id = await employee.getIdByName(name);
      const query = {
        text: `delete from employee where id=($1);`,
        values: [id],
      };
      await execute(query);
      color.success(`deleted employee [ ${name}]`);
    } catch (err) {
      color.error(`unable to delete employee [${name}]. ${err}`);
    }
  },
  getNames: async () => {
    const query = {
      text: `select 
      first_name || ' ' || last_name fullname 
      from employee
      order by fullname`,
      rowMode: "array",
    };
    const { rows } = await execute(query);
    let x = ["--none--"];
    rows.forEach((r) => x.push(r[0]));
    return x;
  },
  getIdByName: async (fullname) => {
    const query = {
      text: `select 
      id 
      from employee 
      where first_name || ' ' || last_name =($1)`,
      values: [fullname],
    };
    return execute(query)
      .then(({ rowCount, rows }) => (rowCount > 0 ? rows[0].id : null))
      .catch((err) => {
        color.error(err);
        return null;
      });
  },
  updateRole: async (name, roleId) => {
    try {
      const id = await employee.getIdByName(name);
      const query = {
        text: `update employee set role_id=($1) where id=($2)`,
        values: [roleId, id],
      };
      await execute(query);
      color.success(`updated employee [${name}] role`)
    } catch (err) {
        color.error(`unable to update employee role. ${err}`)
    }
  },
  updateManager: async (name, manager) => {
    try {
      const id = await employee.getIdByName(name);
      const mid = await employee.getIdByName(manager);
      const query = {
        text: `update employee set manager_id=($2) where id=($1)`,
        values: [id, mid],
      };

      await execute(query);
      color.success(`updated employee [${name}] manager [${manager}]`)
    } catch (err) {
        color.error(`unable to update employee manager. ${err}`)
    }
  },
  viewByDepartment: async () =>{
    const query = {
        text: `select 
        d.name as department, e.first_name || ' ' || e.last_name as employee 
        from employee e 
            inner join role r on e.role_id = r.id 
            inner join department d on r.dept_id = d.id 
        group by d.name, e.first_name, e.last_name 
        order by d.name, employee;`,
        rowMode: 'array'
    }
    const res = await execute(query);
    console.log(`\n\n${"*".repeat(3)} Employee by Department ${"*".repeat(3)}`);
    print(res, null, 30, 60);
  },
  viewByManager: async () => {
    const query = {
        text: `select 
        m.first_name || ' ' || m.last_name manager, 
        e.first_name || ' ' ||  e.last_name employee 
        from employee e 
            left join employee m on e.manager_id = m.id 
        group by manager, employee
        order by manager;`,
        rowMode: 'array'
    }
    const res = await execute(query);
    // console.log(JSON.stringify(res))
    console.log(`\n\n${"*".repeat(3)} Employee by Manager ${"*".repeat(3)}`);
    print(res);
  },
  viewAll: async () => {
    const query = {
        text: `select 
          e.id as id, 
          e.last_name as last,
          e.first_name as first, 
          r.title as title, 
          d.name as department, 
          r.salary as salary, 
          m.first_name || ' ' || m.last_name as manager 
          
          from employee e 
              inner join role r on e.role_id = r.id 
              inner join department d on r.dept_id = d.id
              left join employee m on e.manager_id = m.id
              order by e.last_name, e.first_name;`,
        rowMode: "array",
      }
      const res = await execute(query);
      console.log(`\n\n${"*".repeat(3)} View all Employees ${"*".repeat(3)}`);
    print(res, null, 36, 20, 18, 20, 20, 10, 10);
  },
};
