import { connect, NatsConnection, StringCodec } from 'nats';

//connect to NATS
const server = 
  //local + remote cluster
{ 
    servers: ["localhost:4222", "demo.nats.io:4443"],
    name: 'union',
    noEcho: true,
    timeout: 10 * 1000,
    noRandomize: true,
    maxReconnectAttempts: 5
};

//init codec
const sc = StringCodec();
  
export const startSubscription = 

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
        const sub = nc.subscribe("messages.service.1", {
            timeout: 60 * 1000 // 60sec
        })
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
        nc.close();

        const err = await nc.closed();
        if(err){
            console.log(`Error closing connection: ${err}`);    
        }
        return;
        
    })();
 
// module.exports = startSubscription;