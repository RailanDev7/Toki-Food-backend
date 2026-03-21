import amqp from "amqplib";
let channel: amqp.Channel;

export async function connectRabbitmq() {

    const connection = await amqp.connect(
        process.env.RABBIT_URL as string
    );

    channel = await connection.createChannel();

    return channel;
}

export function getChannel(){

    if(!channel){
        throw new Error("Rabbit not connected");
    }

    return channel;

}
