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
    console.log("----> ", name);
    const query = {
      text: "delete from department where name=($1);",
      values: [name],
    };
    return execute(query).catch((err) =>
      err.code === "23503"
        ? color.error(
            `Unable to delete department [${name}] because it's being used by a role`
          )
        : color.error(err)
    );
  },
  getAll: async () => {
    const query = {
      text: `select id, name from department;`,
      values: [],
      rowMode: "array",
    };
    return execute(query);
  },
  getNames: async () => {
    const query = {
      text: `select name from department`,
      rowMode: "array",
    };
    const { rows } = await execute(query);
    let x = ["--none--"];
    rows.forEach((r) => x.push(r[0]));
    return x;
  },
  print: (header, queryResult) => {
    console.log(`\n\n${"*".repeat(3)} ${header} ${"*".repeat(3)}`);
    print(queryResult, null, 36, 30);
  },
};
