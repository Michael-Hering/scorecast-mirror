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
    ret['weather'] = obj['weather']
    rain = 'rain' in obj.keys()
    if(rain and daily):
        # if('1h' in ret['rain'].keys()):
        ret['rain'] = obj['rain']
        
    elif(rain and not daily):
        if('1h' in obj['rain'].keys()):
            ret['rain'] = obj['rain']['1h']
        else:
            ret['rain'] = 0
    else:
        ret['rain'] = 0

    if('snow' in obj.keys()):
        ret['snow'] = obj['snow']
    else:
        ret['snow'] = 0

    if(daily):
        ret['max_temp'] = obj['temp']['max']
        ret['min_temp'] = obj['temp']['min']
    else:   
        ret['temp'] = obj['temp']

    return ret

'''
    args:
        key: api key for Open Weather
    return:
        dicts with all cities for entry in Historical, DailyForecast, HourlyForecast
'''
def grabData(key):

    # cities = json.loads(cities_json)
    with open('./cities.json') as f:
        cities = json.load(f)

    historical_data = {}
    hourly_data = {}
    daily_data = {}

    for city in cities:
        # city = cities[0]
        url = 'https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&units=imperial&appid={}'.format(city['lat'], city['lon'], key)
        print(url)

        hourly_forecasts = []
        daily_forecasts = []

        r = requests.get(url)
        
        data = r.json()
        # print(data)
        # print('Current data')
        current = data['current']
        
        current_data = parseObj(current)
        # print('-------------------')
        # print('Hourly data')
        hourly = data['hourly']
        for hour in hourly:
            hourly_forecasts.append(parseObj(hour))

        # print('-------------------')

        # print('Daily data')
        daily = data['daily']
        for day in daily:
            daily_forecasts.append(parseObj(day, True))
        # print('-------------------')

        # Add to city to document data
        historical_data[city['mongo-key']] = current
        daily_data[city['mongo-key']] = daily_forecasts
        hourly_data[city['mongo-key']] = hourly_forecasts

    return historical_data, daily_data, hourly_data

'''
    args: 
        collection: collection to enter data into
        data: document to add into the collection (most recent weather data retrieval)

'''
def insertDocument(collection, data):
    collection.insert_one(data)

    return


def main():
    with open('./secrets.json') as f:
        secrets = json.load(f)

    # TODO: Open client and get collections
    local_uri = 'mongodb://localhost:27017/'
    atlas_uri = secrets['mongo_uri']
    myclient = pymongo.MongoClient(local_uri)
    mydb = myclient['scorecast']
    histcol = mydb['historical']
    dailycol = mydb['daily']
    hourlycol = mydb['hourly']
    
    # Get city data for each city
    historical, daily, hourly = grabData(secrets['key'])

    # Insert each data into respective collections
    insertDocument(histcol, historical)
    insertDocument(dailycol, daily)
    insertDocument(hourlycol, hourly)


if __name__ == "__main__":
    main()