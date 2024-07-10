import { execute } from "../db/db.js";
import { print } from "../db/printer.js";
import { color } from "../util/color.js";

export const department = {
  create: async (name) => {
    const query = {
      text: "insert into department (name) values ($1);",
      values: [name],
    };
    return execute(query);
  },
  delete: async (name) => {
    if (!name) return;

    const query = {
      text: "delete from department where name=($1);",
      values: [name],
    };
    return execute(query).then(res => {color.success(`Deleted department [${name}]`); return res}).catch((err) =>
      err.code === "23503"
        ? color.error(
            `Unable to delete department [${name}] because it's being used by a role`
          )
        : color.error(err)
    );
  },
  getIdByName: async (name) => {
    if(!name) return null; 
    const query = {
        text: `select id from department where name=($1);`,
        values: [name],
    };
    return execute(query).then(({rowCount, rows}) => rowCount > 0 ? rows[0].id : null).catch(err => color.error(err));
  },
  getNames: async () => {
    const query = {
      text: `select name from department order by name`,
      rowMode: "array",
    };
    const { rows } = await execute(query);
    let x = ["--none--"];
    rows.forEach((r) => x.push(r[0]));
    return x;
  },
  viewAll: async () => {
    const query = {
      text: `select id, name from department order by name;`,
      rowMode: 'array',
    }
    const res = await execute(query);
    console.log(`\n\n${"*".repeat(3)} All Departments ${"*".repeat(3)}`);
    print(res, null, 36, 30);
  },
  viewBudget: async () => {
    const query = {
      text: `select 
      d.name,
      sum(r.salary) Expenses
      
      from department d left join role r on d.id = r.dept_id 
      group by d.name 
      order by d.name;`,
      rowMode: 'array'
    };
    const res = await execute(query);
    print(res, null, 30, 20)
  },
};
