import pymongo
from datetime import datetime
import json


'''
    args: 
        db: the instance of pymongo
        bet: the bet to update
        status: the new status of the bet
'''
def updateBetStatus(db, bet, status):
  bets_collection = db['bets']
  bets_collection.find_one_and_update(
    {"_id": bet["_id"]}, 
    {"$set": {"status": status}}
  )
  return


'''
    args: 
        city: the city to return a value for
        date: the date to calculate values on
        historical_data: list of historical documents
'''
def getMaxTemp(date, city, historical_data):
  max_temp = 0
  for weather_snapshot in historical_data:
    # Check date
    snapshot_date = datetime.utcfromtimestamp(int(weather_snapshot[city]["dt"])).date().strftime("%Y-%m-%d")
    if snapshot_date == date:

      # Check Temp
      current_temp = int(weather_snapshot[city]["temp"])
      if current_temp > max_temp:
        max_temp = current_temp

  print("actual max temp: " + str(max_temp))
  
  return max_temp


'''
    args: 
        city: the city to return a value for
        date: the date to calculate values on
        historical_data: list of historical documents
'''
def getMinTemp(date, city, historical_data):
  min_temp = 999999
  for weather_snapshot in historical_data:
    # Check date
    snapshot_date = datetime.utcfromtimestamp(int(weather_snapshot[city]["dt"])).date().strftime("%Y-%m-%d")
    if snapshot_date == date:

      # Check Temp
      current_temp = int(weather_snapshot[city]["temp"])
      if current_temp < min_temp:
        min_temp = current_temp

  print("actual min temp: " + str(min_temp))

  return min_temp


'''
    args: 
        city: the city to return a value for
        date: the date to calculate values on
        historical_data: list of historical documents
'''
def getMaxWind(date, city, historical_data):
  max_wind = 0
  for weather_snapshot in historical_data:
    # Check date
    snapshot_date = datetime.utcfromtimestamp(int(weather_snapshot[city]["dt"])).date().strftime("%Y-%m-%d")
    if snapshot_date == date:

      # Check Wind
      current_wind = int(weather_snapshot[city]["wind_speed"])
      if current_wind > max_wind:
        max_wind = current_wind

  print("actual max wind: " + str(max_wind))

  return max_wind


'''
    args: 
        city: the city to return a value for
        date: the date to calculate values on
        historical_data: list of historical documents
'''
def getTotalPrecip(date, city, historical_data):
  total_precip = 0
  for weather_snapshot in historical_data:
    # Check date
    snapshot_date = datetime.utcfromtimestamp(int(weather_snapshot[city]["dt"])).date().strftime("%Y-%m-%d")
    if snapshot_date == date:

      # Check Precip
      if "rain" in weather_snapshot[city]:
        total_precip += int(weather_snapshot[city]["rain"]["1h"])

  print("actual total precip: " + str(total_precip))
  return total_precip


def getMaxHumid(date, city, historical_data):
  max_humid = 0
  for weather_snapshot in historical_data:
    # Check date
    snapshot_date = datetime.utcfromtimestamp(int(weather_snapshot[city]["dt"])).date().strftime("%Y-%m-%d")
    if snapshot_date == date:
      # Check Humid
      current_humid = int(weather_snapshot[city]["humidity"])
      if current_humid > max_humid:
        max_humid = current_humid

  print("actual max humidity: " + str(max_humid))
  return max_humid


'''
    args: 
        bets: list of bet documents
        historical_data: list of historical documents
'''
def processBets(db, bets, historical_data):

    for bet in bets:

      # Only process bets that are pending
      if bet["status"] == "pending":
        print()
        print("--------")

        # Get a string representing the city and date the bet was placed for
        bet_city = bet["city"]
        bet_date = datetime.utcfromtimestamp((int(bet["date"]))/1000).date().strftime("%Y-%m-%d")

        print("processing bet", bet["type"], bet["weatherFeature"], bet["val"], "for", bet["city"], "on " + bet_date)

        if bet["weatherFeature"] == "maxTemp":

          # Get the maximum temperature for bet_city on bet_date
          max_temp = getMaxTemp(bet_date, bet_city, historical_data)

          # Check if they won
          if bet["type"] == "over" and max_temp > bet["val"] or bet["type"] == "under" and max_temp < bet["val"]:
            print("WIN")
            updateBetStatus(db, bet, "win")
          else:
            print("LOSS")
            updateBetStatus(db, bet, "loss")

        elif bet["weatherFeature"] == "minTemp":

          # Get the minimum temperature for bet_city on bet_date
          min_temp = getMinTemp(bet_date, bet_city, historical_data)

          # Check if they won
          if bet["type"] == "over" and min_temp > bet["val"] or bet["type"] == "under" and min_temp < bet["val"]:
            print("WIN")
            updateBetStatus(db, bet, "win")
          else:
            print("LOSS")
            updateBetStatus(db, bet, "loss")

        elif bet["weatherFeature"] == "maxWind":

          # Get the maximum wind speed for bet_city on bet_date
          max_wind = getMaxWind(bet_date, bet_city, historical_data)

          # Check if they won
          if bet["type"] == "over" and max_wind > bet["val"] or bet["type"] == "under" and max_wind < bet["val"]:
            print("WIN")
            updateBetStatus(db, bet, "win")
          else:
            print("LOSS")
            updateBetStatus(db, bet, "loss")

        elif bet["weatherFeature"] == "totalPrecip":

          # Get the total precipitation for bet_city on bet_date
          total_precip = getTotalPrecip(bet_date, bet_city, historical_data)

          # Check if they won
          if bet["type"] == "over" and total_precip > bet["val"] or bet["type"] == "under" and total_precip < bet["val"]:
            print("WIN")
            updateBetStatus(db, bet, "win")
          else:
            print("LOSS")
            updateBetStatus(db, bet, "loss")
        
        elif bet["weatherFeature"] == "humidity":
          
          # Get the total humidity for bet_city on bet_date
          max_humidity = getMaxHumid(bet_date, bet_city, historical_data)
          
          # Check if they won
          if bet["type"] == "over" and max_humidity > bet["val"] or bet["type"] == "under" and max_humidity < bet["val"]:
            print("WIN")
            updateBetStatus(db, bet, "win")
          else:
            print("LOSS")
            updateBetStatus(db, bet, "loss")

    return


def main():
    # with open('./secrets.json') as f:
    #     secrets = json.load(f)

    # Open client and get collections
    local_uri = 'mongodb://localhost:27017/'
    atlas_uri = 'mongodb+srv://dbUser:lHHRGsTDThtYq8zs@scorecast-cluster-iyipd.gcp.mongodb.net/test?retryWrites=true&w=majority'
    myclient = pymongo.MongoClient(atlas_uri)
    mydb = myclient['scorecast']

    bets_collection = mydb['bets']
    bets = list(bets_collection.find({}))

    historical_collection = mydb['historical']
    historical_data = list(historical_collection.find({}))

    processBets(mydb, bets, historical_data)

if __name__ == "__main__":
    main() 