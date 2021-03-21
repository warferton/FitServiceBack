//Represents a message to be sent to/by a service
export class Message {
    body! : string;
    timestamp : Date = new Date();

    constructor(message_body : string){
        this.body = message_body;
    }
}