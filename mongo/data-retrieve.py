import pymongo
import json
import requests

'''
Gets the time, temp
'''
def parseObj(obj, daily=False):
    ret = {}

    ret['time'] = obj['dt']
    ret['windspeed'] = obj['wind_speed']
    rain = 'rain' in obj.keys()
    if(rain and daily):
        ret['rain'] = obj['rain']
    elif(rain and not daily):
        ret['rain'] = obj['rain']['1h']

    if(daily):
        ret['max_temp'] = obj['temp']['max']
        ret['min_temp'] = obj['temp']['min']
    else:
        ret['temp'] = obj['temp']

    print(ret)

    return ret

'''
NOTE: this should only be called once for each city every ten minutes per the api
    args:
        key: api key for Open Weather
    return:
        dicts with all cities for entry in Historical, DailyForecast, HourlyForecast
'''
def grabData(key):
    with open('./cities.json') as f:
        cities = json.load(f)

    city = cities[0]
    url = 'https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&appid={}'.format(city['lat'], city['lon'], key)
    print(url)

    hourly_forecasts = []
    daily_forecasts = []

    r = requests.get(url)
    
    data = r.json()
    print('Current data')
    current = data['current']
    
    current_data = parseObj(current)
    print('-------------------')
    print('Hourly data')
    hourly = data['hourly']
    for hour in hourly:
        hour_data = parseObj(hour)
    print('-------------------')

    print('Daily data')
    daily = data['daily']
    for day in daily:
        day_data = parseObj(day, True)
    print('-------------------')

    return 0, 0, 0

'''
    args: 
        collection: collection to enter data into
        data: document to add into the collection (most recent weather data retrieval)

'''
def insertDocument(collection, data):
    return

def main():
    with open('./apikey.json') as f:
        apikey = json.load(f)

    # TODO: Open client and get collections
    
    # Get city data for each city
    historical, daily, hourly = grabData(apikey['key'])
    
    # TODO: Get the data formated and added as a document in each collection

    # Insert each data into respective collections

if __name__ == "__main__":
    main()