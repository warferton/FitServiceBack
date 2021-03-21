//instantiate prisma client
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function executeInsertMessage(message_body : string) {
    try{
        const msgs = await prisma.messages_in.create({
            data:{
                message_body,
            }
    });
    }catch(err){
        console.log(`Error has occurred! ${err}`);
    }
    
}
    
    
    
    
    
    

















    
    
    
// ======================= Vanilla pg Insert Func =============================
    // const {Client} = require('pg');
    
    // const clientSettings = {
    //     user: "postgres",
    //     password: "password",
    //     host: "localhost",
    //     port: 5432,
    //     database: "messages"
    // }
    // export async function executeInsertMessage(message: string){
    //     const client = new Client(clientSettings);
    //     try{
    //         await client.connect();
    //         await client.query('BEGIN');
    //         await client.query('INSERT INTO messages_in(message_body) values ($1)',[message]);
    //         await client.query('COMMIT');
    //     }
    //     catch(err){
    //         console.log('Error occurred ' + err.message);
    //         await client.query('ROLLBACK');
    //     }
    //     finally{
    //         await client.end();
    //         console.log('Connection closed');
    //     }
    // }