import { connect, NatsConnection, StringCodec } from 'nats';
import { Message } from 'custom_types/message';
import { executeInsertMessage } from 'utils/transactions';

//connect to NATS
const server = 
  //local + remote cluster
{ 
    servers: ["localhost:4222", "demo.nats.io:4443"],
    name: 'service_2_sub',
    noEcho: true,
    timeout: 10 * 1000,
    noRandomize: true,
    maxReconnectAttempts: 5
};

//subject to subscribe to
const subscription_subject = "messages.service.2";

//init codec
const sc = StringCodec();
  
const startSubscription =
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
                
                console.log(`[${sub.getProcessed()}]: ${msg}  - pending: ${sub.getPending()}`);
                executeInsertMessage(new Message(msg));
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
 