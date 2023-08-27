import { kafka } from "../config/kafka";
import { EachMessagePayload } from "kafkajs";

const admin = kafka.admin();

async function createTopic(topicName:string) {
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic: topicName, numPartitions: 1 }],
  });
  await admin.disconnect();
}

async function deleteTopic(topicName:string) {
  await admin.connect();
  await admin.deleteTopics({
    topics: [topicName],
  });
  await admin.disconnect();
}

export const producerNotification = async (req: any, res: any) => {
  const { message,userId } = req.body;

  await createTopic(`notification-${userId}`);

  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: `notification-${userId}`,
    messages: [{ value: message }],
  });

    await producer.disconnect();
    res.json({ message: "Notification sent successfully" });
};

export const consumerNotification = async (req: any, res: any) => {

    const { userId } = req.body;

    const consumer = kafka.consumer({ groupId: `notification-${userId}` });
    await consumer.connect();
    await consumer.subscribe({ topic: `notification-${userId}`, fromBeginning: true });
    let msg = "";
    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
          if(message.value){
            msg = message.value!.toString();
            console.log(message.value!.toString());
          }
          else
          {
            console.log("No message");
          }
        msg = message.value!.toString();
        },
    });

      // Delete the topic after consuming all messages
      await deleteTopic(`notification-${userId}`);

    res.json({ message: msg });
    }
