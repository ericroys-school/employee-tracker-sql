import { execute } from "../db/db.js";
import { role } from "./role.js";
import { color } from "../util/color.js";

export const employee = {
  create: async (first, last, roleName, mgr) => {
    if (roleName === "--none--"){
      throw("--none-- is a placeholder. select a different value or add a new role if there is no other value");
        
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
  delete: (first, last) => {},
  getNames: async () => {
    const query = {
      text: `select first_name || ' ' || last_name as fullname from employee`,
      rowMode: "array",
    };
    const { rows } = await execute(query);
    let x = ["--none--"];
    rows.forEach((r) => x.push(r[0]));
    return x;
  },
  getIdByName: async (fullname) => {
    const query = {
      text: `select id from employee where first_name || ' ' || last_name =($1)`,
      values: [fullname],
    };
    return execute(query)
      .then(({ rowCount, rows }) => (rowCount > 0 ? rows[0].id : null))
      .catch((err) => color.error(err));
  },
};
