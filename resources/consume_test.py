import kafka
import time
import asyncio

topics = {
    "New-York",
    "Los-Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San-Antonio",
    "San-Diego",
    "Dallas",
    "San-Jose",
    "Austin",
    "Jacksonville",
    "San-Fransisco",
    "Charlotte",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Boston",
    "El-Paso",
    "Detroit",
    "Nashville",
    "Portland",
    "Las-Vegas",
    "Baltimore",
    "Albuquerque",
    "Phoenix",
    "Honolulu",
    "test",
  }

# Function to start an asynchronous operation, when we dont want to wait for it to complete
def fire_and_forget(task, *args, **kwargs):
  loop = asyncio.get_event_loop()
  if callable(task):
      return loop.run_in_executor(None, task, *args, **kwargs)
  else:    
      raise TypeError('Task must be a callable')

def stream(consumer):
  for message in consumer:
    print("Consumed: {Data: " + str(message.value) + "}")

async def main(): 
  broker_host_ip = "35.223.141.138"
  server_string = broker_host_ip + ":9092"
  consumers = []
  # Set up kafka consumer
  connected = False
  for topic in topics:
    print("Creating consumer with topic: " + topic)

    consumer = kafka.KafkaConsumer(
      topic,
      auto_offset_reset='earliest',
      enable_auto_commit=True,
      bootstrap_servers=[server_string])

    consumers.append(consumer)

  # Start streaming from all consumers
  for consumer in consumers:
    fire_and_forget(stream, consumer)


if __name__ == '__main__':
  loop = asyncio.get_event_loop()

  # Start the program
  loop.run_until_complete(main())

  # Finish all runing tasks before returning
  pending = asyncio.Task.all_tasks()
  loop.run_until_complete(asyncio.gather(*pending))