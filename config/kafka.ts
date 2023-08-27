import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'pensdown-notification',
  brokers: ['pkc-l7pr2.ap-south-1.aws.confluent.cloud:9092'],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: 'CLBDKYTUEYVFLEXE',
    password: 'wJ07+ZBuInkRAhUPRYG8OcdlF0qjDNRG/d0EfMwgNpZs2rkQvn6lFntznIGoSRUU'
  }
})

// async function init(){
//   const admin = kafka.admin()
//   console.log('Connecting.....')
//   await admin.connect()
//   console.log('Connected!')
//   await admin.createTopics({
//     topics: [{
//       topic: 'notification',
//       numPartitions: 0
//     }]
//   })
//   console.log('Created Notification Successfully!')

//   console.log('Disconnecting.....')
//   await admin.disconnect()
// }

// init().catch(console.error);