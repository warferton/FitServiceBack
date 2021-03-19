import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


export async function getAllMessages() {
    const msgs = await prisma.messages_in.findMany({
        orderBy : {
            message_time : 'desc'
        }
    });
    console.table(msgs);
}






// const { Client } = require('pg');

// const clientSettings = {
//     user: "postgres",
//     password: "password",
//     host: "localhost",
//     port: 5432,
//     database: "messages"
// };

// export function lookup(){
//     const client = new Client(clientSettings);
//     client.connect()
//             .then(() =>console.log("CONNECTION SUCCESSFUL"))
//             .then(() => client.query('SELECT * FROM messages_in'))
//             .then((res: any) => console.table(res.rows))
//         .catch((err: any) => console.log(err))
//     .finally(() => {
//         client.end();
//         console.log("CONNECTION CLOSED");
        
//     });
// }