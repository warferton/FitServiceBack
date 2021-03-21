import { connect, NatsConnection, StringCodec } from 'nats';
import { randomWord } from 'utils/random';
import { wait } from 'utils/time'

//connect to NATS
const server = 
  //local + remote cluster
{ 
    servers: ["localhost:4222", "demo.nats.io:4443"],
    name: 'service_1_pub',
    noEcho: true,
    noRandomize: true,
    timeout: 10 * 1000,
    maxReconnectAttempts: 5
};

//subject to publish to
const publish_subject = "messages.service.2";

//init codec
const sc = StringCodec();

const startPublisher =

    (async () => {
        let nc : NatsConnection;
        try {
            nc = await connect(server);
        } catch (err) {
            console.log(`error connecting to ${JSON.stringify(server)} \n ${err}`);
            return;
        };

        console.log(`connected to ${nc.getServer()}`);

        await wait(5 * 1000);

        console.log("sending..");
        
        for(let i = 0; i < 15; i++){
            let msg = randomWord() + ' ' + randomWord();
            nc.publish(publish_subject, sc.encode(msg));
            console.log("sent...");
            await wait(15 * 1000);
        }

        nc.publish(publish_subject, sc.encode("close"));

        await nc.flush();
        await nc.drain();
        nc.close();
        
    })();
