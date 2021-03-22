import { Message } from '../custom_types/message';
import { connect, NatsConnection, StringCodec } from 'nats';
import { executeInsertMessage } from '../utils/transactions';

//NATS connection config
const server = 
  //local + remote cluster
{ 
    servers: ["nats:4222", "demo.nats.io:4443"],
    name: 'service_1_sub',
    noEcho: true,
    timeout: 10 * 1000,
    noRandomize: true,
    maxReconnectAttempts: 5
};

//subject to subscribe to
const subscription_subject = "messages.service.1";

//init codec
const sc = StringCodec();
  
//execute 
(async () => {
    let nc : NatsConnection;
    try {
        nc = await connect(server);
    } catch (err) {
        console.log(`error connecting to ${JSON.stringify(server)} \n ${err}`);
        return;
    };
    console.log(`connected to ${nc.getServer()}`);
    
    //Setting subscriptions
    const sub = nc.subscribe(subscription_subject, {
        timeout: 60 * 1000 // 60sec timeout
    });

    try{
        for await(const m of sub) {
            let msg = sc.decode(m.data);

            if(msg === 'close') break;
            
            executeInsertMessage(new Message(msg));
            
            console.log(`[${sub.getProcessed()}]: ${msg}  - time: ${new Date().toLocaleTimeString()}`);
        }
    }catch(err){
        console.error(`Exception caught: ${err.message}`);
    }
    console.log("subscription closed");
    
    try{
        await nc.drain();
        await nc.close();
        await nc.closed();   
    }catch(err){
        console.log(`Error caught: ${err.message}`);
    }
    
    
})();
 