from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import time
import kafka
import json
import os

class TweetListener(StreamListener):
  """
  A class that Overrides tweepy.StreamListener to add logic to on_data

  """
  def on_data(self, data):
      res = json.loads(data)
      if ("user" not in res): # Response is not a tweet, return
        return
      if (res["retweeted"] == False): # Response is an original tweet, produce to Kafka
        topic = cityByAccount[res["user"]["id_str"]]
        producer.send(topic, data.encode('utf-8'))
        print ("Produced: {Topic: " + topic + ", Tweet: " + res["text"] + "}", flush=True)
      return True

  def on_error(self, status):
      print (status)

# Dictionary that maps city names to a list of accounts that tweet about the city's weather
accountsByCity = {
  "New-York": ["1473351169", "16299627", "128126054", "607867793", "481066283", "382374620", "86890978", "318884072"],
  "Los-Angeles": ["382868960", "81471317", "827826637223972864", "1481010590", "599632006"],
  "Chicago": ["1482572785", "966105897406676993", "370389357", "827796859670372357", "94097976", "632062492"],
  "Houston": ["18870078", "18736115", "3299061206", "1535314998", "870736109713608704", "29239301", "600958397"],
  "Phoenix": ["90117873", "18999261", "589349263", "590099044"],
  "Philadelphia": ["90303826", "382239256"],
  "San-Antonio": ["90336986", "9830752", "594749537"],
  "San-Diego": ["80994311", "281817407", "52894809", "492586313"],
  "Dallas": ["90540771", "2670105834"],
  "San-Jose": ["134162350", "2569781061", "54463831"],
  "Austin": ["3608874074", "594749537", "3035374285"],
  "Jacksonville": ["90770821", "590266004", "1131007313677049857", "590266004"],
  "San-Fransisco": ["4417973952", "1413275293", "596687292", "829832575518547968", "1738486814"],
  "Charlotte": ["94694970", "775264548", "1663715228", "22215485", "46899601"],
  "Indianapolis": ["90779112", "599202487", "306927069"],
  "Seattle": ["82533442", "34379755", "749820059640401921", "727007094", "65411847", "592413865"],
  "Denver": ["3158157865", "108505634", "1729664714", "396777290", "784249352285851648", "598443842"],
  "Boston": ["21071455", "4828283860", "297551913", "108076943", " 21071455", "2385285175", "50010418", "632301127"],
  "El-Paso": ["134986634", "482386521", "156744696"],
  "Detroit": ["90542413", "596438734"],
  "Nashville": ["36685628", "110199470", "596841936"],
  "Portland": ["44822676", "569660424", "637259483"],
  "Las-Vegas": ["131359648", "155806404", "2253905628", "18252293", "594376322"],
  "Baltimore": ["860334187", "11996222", "95102784", "1050362718"],
  "Albuquerque": ["487922319", "2231553444", "111470412"],
  "Phoenix": ["90117873", "589349263"],
  "Honolulu": ["113211714", "304054410"],
}

# A list of all of the twitter account id's
allAccounts = []

# A 1:1 dictionary that map's a twitter id to a specific city 
cityByAccount = {}

# Populate cityByAccount and allAccounts, this will save us work later
for key in accountsByCity:
  for id in accountsByCity[key]:
    cityByAccount[id] = key
    allAccounts.append(id)

# Get server ip from the environment
hasHostIp = False
while not hasHostIp:
  try:
    broker_host_ip = os.environ["BROKER_HOST_IP"]
    hasHostIp = True
  except:
    print("Kafka broker host IP address not set. Retrying in 10 seconds...", flush=True)
    time.sleep(10)
    hasHostIp = False

server_string = broker_host_ip + ':9092'

# Set up kafka producer
connected = False
while not connected:
  try:
    producer = kafka.KafkaProducer(bootstrap_servers=[server_string])
    print("Producer connected to kafka", flush=True)
    connected = True
  except kafka.errors.NoBrokersAvailable:
    print("Waiting for kafka broker to be available...", flush=True)
    time.sleep(1)
    connected = False
  except ValueError:
    print("Waiting for kafka broker to start...", flush=True)
    connected = False
  except:
    raise Exception("Something else went wrong")

# Get credentials form the environment
hasCredentials = False
while not hasCredentials:
  try:
    access_token = os.environ["TWITTER_ACCESS_TOKEN"]
    access_token_secret =  os.environ["TWITTER_ACCESS_TOKEN_SECRET"]
    consumer_key =  os.environ["TWITTER_CONSUMER_KEY"]
    consumer_secret =  os.environ["TWITTER_CONSUMER_SECRET"]
    hasCredentials = True
  except:
    print("Twitter credentials not set. Retrying in 10 seconds...", flush=True)
    time.sleep(10)
    hasCredentials = False

# OAuth with twitter
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Start single tweet listener
listener = TweetListener()
stream = Stream(auth, listener)
stream.filter(follow = allAccounts, is_async=False)