import { connect } from "amqplib";
import cron from "node-cron";
import redisClient from "../config/redis";

// cron.schedule('*/15 * * * *', () => {
//   console.log('running a task every 15 minutes');
// });

// cron.schedule("*/5 * * * * *", () => {
//   console.log("running a task every 5 seconds");
// });

export const publishNotification = async (req: any, res: any) => {
  try {
    const userId = req.body.userId;
    const queueMessage = req.body.message;

    const connection = await connect(process.env.CLOUDAMQP_URL as string);
    const channel = await connection.createChannel();

    const uniqueQueueName = userId;
    // const msg = { message: queueMessage };
    // console.log(msg)
    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue(uniqueQueueName, {
      durable: true,
      autoDelete: true,
    });

    // Send data to the queue
    const routingKey = uniqueQueueName as string;
    console.log("routingKey", routingKey);
    console.log("queueMessage", queueMessage);
    await channel.sendToQueue(
      routingKey,
      Buffer.from(JSON.stringify(queueMessage)),
      { persistent: true }
    );
    console.log("Message Sent");

    // Close the channel and connections

    setTimeout(async function () {
      await channel.close();
      await connection.close();
    }, 5000);

    res.send("Message Sent");
  } catch (error) {
    console.log(error);
  }
};


// async function fetchData() {
//   try {
//     const cachedData = await getDataFromCache('userId');
//     if (cachedData !== null) {
//       // Use cached data
//     } else {
//       // Fetch data from the database
//     }
//   } catch (error) {
//     console.error(error);
//     // Handle error
//   }
// }

export const subscribeNotification = async (req: any, res: any) => {
  try {
    const notificationQueue = req.body.userId;
    const cachedData = req.body.cachedData;
    console.log("notificationQueue", notificationQueue);

   
    const connection = await connect(process.env.CLOUDAMQP_URL as string);
    const channel = await connection.createChannel();

    var notificationMessage: string;
    var retrievedMessage: string;
    var messages = [] as string[];
    // console.log("queue",channel)

    await channel.assertQueue(notificationQueue, {
      durable: true,
      autoDelete: true,
    });

    await channel.consume(notificationQueue, (message) => {
      console.log("message", message?.content.toString());
      if (message) {
        retrievedMessage = JSON.parse(message.content.toString());
        messages.push(retrievedMessage);
        console.log("retrievedMessage", retrievedMessage);

        channel.ack(message);
        // res.send(retrievedMessage)
      }

      // if(retrievedMessage.companyName === companyName){
      //   notificationMessage = retrievedMessage.queueMessage;
      // }
      // else
      // {
      //   notificationMessage = "No new notification";
      // }
    });

    // await channel.deleteQueue(notificationQueue);
    setTimeout(async function () {
      await channel.close();
      await connection.close();
      console.log("Message Sent");
    }, 7000);

    if (messages.length == 0) res.send("no new notification");
    else res.send(messages);

    // console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
};
