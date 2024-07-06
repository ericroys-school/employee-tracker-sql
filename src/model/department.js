
import { execute } from "../db/db.js";


export const department = {
    create: (name) => {
        const query = {
            text: 'insert into department (name) values ($1);',
            values: [name]
        }
        return execute(query);
    }
}
