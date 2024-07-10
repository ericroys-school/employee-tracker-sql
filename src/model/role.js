import { execute } from "../db/db.js";
import { department } from "./department.js";
import { color } from "../util/color.js";
import { print } from "../db/printer.js";

export const role = {
  create: async (name, salary, dept) => {
    const deptId = await department.getIdByName(dept);
    if (!deptId) {
      color.error(`unable to get id for department [${dept}`);
      return;
    }
    const query = {
      text: "insert into role (title, salary, dept_id) values ($1, $2, $3)",
      values: [name, salary, deptId],
    };
    return execute(query);
  },
  getNames: async () => {
    const query = {
      text: "select title from role",
      rowMode: "array",
    };
    const { rows } = await execute(query);
    let x = ["--none--"];
    rows.forEach((r) => x.push(r[0]));
    return x;
  },
  delete: async (title) => {
    if (!title) return;

    const query = {
      text: "delete from role where title=($1);",
      values: [title],
    };
    return execute(query)
      .then((res) => {
        color.success(`Deleted Role [${title}]`);
        return res;
      })
      .catch((err) =>
        err.code === "23503"
          ? color.error(
              `unable to delete role [${title}] because it's in use by employee`
            )
          : color.error(err)
      );
  },
  getIdByName: async (title) => {
    if(!title) {console.log("title emmpty!"); return null}; 
    const query = {
        text: `select id from role where title=($1);`,
        values: [title],
    };
    return execute(query).then(({rowCount, rows}) => rowCount > 0 ? rows[0].id : null).catch(err => color.error(err));
  },  
  getAll: async () => {
    const query = {
        text: 'select r.id as id, r.title as title, r.salary as salary, d.name as department from role r left join department d on r.dept_id = d.id',
        rowMode: 'array'
    };
    return execute(query);
  },
  print: (header, queryResult) => {
    console.log(`\n\n${"*".repeat(3)} ${header} ${"*".repeat(3)}`);
    print(queryResult, null, 36, 30, 20, 30);
  },
};
