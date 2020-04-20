const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log("getting tweets for city: " + req.body.topic)
  var kafka = require('kafka-node');
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient({kafkaHost: '35.223.141.138:9092'});
  const consumer = new Consumer(
        client,
        [
            { topic: req.body.topic}
        ],
        {
            autoCommit: false
        }
    );

  const tweets = []

  consumer.on('message', function (message) {
    tweets.push(message.value);
    if(message.offset == (message.highWaterOffset -1)) {
      try {
        return res.send(tweets);
      } catch {

      }
    }
  });
});

module.exports = router;
