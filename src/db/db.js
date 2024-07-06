import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

const pool = new Pool(
  {
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
  },
  console.info(`Connected to [${process.env.PG_DB}] database`)
);

pool.on("error", (err, client) => {
  console.error(`Sql error `, err);
  client.release();
});

/** Get a client from the pool */
export async function connect() {
  return await pool.connect();
}

export async function query(statement) {
  let client;
  try {
    client = await connect();
    client.query(statement, function (err, { rows }) {
      console.log(err ? "Error: " + err : "No error");
        return rows;
    });
  } catch (err) {
    if (client) client.release();
    console.error(err);
    throw err;
  }
}

/**
 * 
 * @param {
 * text sql statement, 
 * values
 * } query 
 */
export async function execute(query) {
    let client;
    try {
      client = await connect();
      client.query(query, function (err, { rows }) {
        console.log(err ? "Error: " + err : "No error");
          return rows;
      });
    } catch (err) {
      if (client) client.release();
      console.error(err);
      throw err;
    }
  }

// `insert into department (name) values (${v});`;
// `delete from department where id=${id};`;
// `select id, name from department;``TODO - >Budget``insert into role (title, salary, dept_id) values (${title}, ${salary}, ${dept_id});`;
// `delete from role where id=${id};`;
// `select r.id as id, r.title as title, r.salary as salary, d.name as department from role r inner join department d on r.dept_id=d.id;`;
// `insert into employee (first_name, last_name, role_id, manager_id)
// values (${first}, ${last}, ${rid}, ${mid});`;
// `delete from employee where id=${id};`;
// `update employee set role_id=${rid} where id=${id};`;
// `update employee set manager_id=${mid} where id=${id};`;
// `select e.id as id, e.first_name as 'first name', e.last_name as 'last name', `;
