from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from kafka import SimpleProducer, KafkaClient

access_token = ""
access_token_secret =  ""
consumer_key =  ""
consumer_secret =  ""

class TweetListener(StreamListener, topic):
  """
  A class that Overrides tweepy.StreamListener to add login to on_data

  """

  def on_data(self, data):
      producer.send_messages(self.topic, data.encode('utf-8'))
      print (data)
      return True

  def on_error(self, status):
      print (status)

# Set up kafka client
kafka = KafkaClient("localhost:9092")
producer = SimpleProducer(kafka)

# OAuth with twitter
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

teams = [
  "premier league",
  "Arsenal",
  "Aston Villa",
  "AFC Bournemouth",
  "Brighton and Hove Albion",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Leicester City",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Norwich City",
  "Sheffield United",
  "Southampton",
  "Tottenham Hotspur",
  "Watford",
  "West Ham United",
  "wolverhampton Wanderers",
]

# Start tweet listeners
for team in teams:
  listener = TweetListener(team)
  stream = Stream(auth, listener)
  stream.filter(track = team)