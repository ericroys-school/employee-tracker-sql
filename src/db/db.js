import pg from 'pg'
const { Pool } = pg
import "dotenv/config";

const pool = new Pool(
    {
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        host: process.env.PG_HOST,
        database: process.env.PG_DB
    },
    console.info(`Connected to [${process.env.PG_DB}] database`)
)

pool.on('error', (err, client)=> {
    console.error(`Sql error `, err);
    client.release();
})

/** Get a client from the pool */
export async function connect(){
    return await pool.connect();
}