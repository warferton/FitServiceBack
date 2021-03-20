import cors from 'cors'
import express from 'express'
import { connect, NatsConnection, StringCodec } from 'nats';
// import { getAllMessages } from './utils/displaydata'
import { executeInsertMessage } from './utils/transactions'
import { wait } from './utils/time'

//instantiate express app ??
const app = express();

app.use(cors());
app.use(express.json());
//===================

//connect to NATS
const servers = 
[{ 
    //remote server
    servers: "demo.nats.io:4222",
    name: 'remote_nats',
    // noEcho: true, 
    timeout: 10 * 1000,
    waitOnFirstConnect: true
},
  //local sever
{ 
    servers: 'localhost',
    port: 4222,
    name: 'local',
    // noEcho: true,
    timeout: 10 * 1000
}];

//init codec
const sc = StringCodec();
  
(async (server) => {
    let nc : NatsConnection;
    try {
        nc = await connect(server);
     } catch (err) {
        console.log(`error connecting to ${JSON.stringify(servers[1])} \n ${err}`);
        return;
     };

    console.log(`connected to ${nc.getServer()}`);

    await wait(5 * 1000);

    console.log("sending..");
    
    for(let i = 0; i < 5; i++){
        nc.publish("service1.messages", sc.encode("test 5 sec" + i));
        await wait(15 * 1000);
    }

    nc.publish("service1.messages", sc.encode("close"));

    await nc.flush();
    await nc.drain();
    
})(servers[1]);
 