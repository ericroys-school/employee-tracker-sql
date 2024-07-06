import { connect } from "./src/db/db.js";

let client;
try {
  client = await connect();
  console.log("Connected!!!");
  // client.query(`select * from department`, (err, {rows}) => console.log(rows));
  client.query("SELECT * FROM department", function (err, { rows }) {
    console.log(err ? "Error: " + err : "No error");
    console.log(rows);
  });
} catch (err) {
  console.error(err);
} finally {
  if (client) client.release();

}

