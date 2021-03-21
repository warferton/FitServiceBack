import { connect, NatsConnection, StringCodec } from 'nats';
import { wait } from '../utils/time'

//connect to NATS
const server = 
  //local + remote cluster
{ 
    servers: ["localhost:4222", "demo.nats.io:4443"],
    name: 'union',
    noEcho: true,
    noRandomize: true,
    timeout: 10 * 1000,
    maxReconnectAttempts: 5
};

//init codec
const sc = StringCodec();
  
export const startPublisher = 
    (async () => {
        let nc : NatsConnection;
        try {
            nc = await connect(server);
        } catch (err) {
            console.log(`error connecting to ${JSON.stringify(server)} \n ${err}`);
            return;
        };
        console.log(`connected to ${nc.getServer()}`);

        // await wait(5 * 1000);

        console.log("sending..");
        
        for(let i = 0; i < 15; i++){
            nc.publish("messages.service.1", sc.encode("message__to_node_1 t:" + i));
            console.log("sent...");
            await wait(15 * 1000);
        }

        nc.publish("messages.service.1", sc.encode("close"));

        await nc.flush();
        await nc.drain();
        nc.close();
        
    })();

// module.exports = startPublisher;
 