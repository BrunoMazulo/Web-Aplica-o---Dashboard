import { createPool } from 'promise-mysql';

export async function connect(){
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'portal_conformacao',
        connectionLimit: 10
    });
    return connection;
}