import { connect, NatsConnection, StringCodec } from 'nats';

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

    //Setting subscriptions
    const sub = nc.subscribe("messages.service.2", {
        // timeout: 20000
    });
    try{
        for await(const m of sub) {
            let msg = sc.decode(m.data);

            if(msg === 'close') break;
            
            console.log(`[${sub.getProcessed()}]: ${msg}  - pending: ${sub.getPending()}`);
            // executeInsertMessage(msg);
        }
    }catch(err){
        console.error(`Exception caught: ${err.message}`);
    }
    console.log("subscription closed");
    
    await nc.drain().catch(err => console.log(err));

    const e = await nc.closed();
    if(e){
        console.log(`Error closing connection: ${e}`);    
    }
    return;
    
})(servers[1]);
 