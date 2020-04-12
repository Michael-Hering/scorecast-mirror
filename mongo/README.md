## About

This grabs data from OpenWeather's OneCallAPI and stores it in on Mongo Atlas. The code in this folder only works locally, but writes to the Atlas db. Since we are using GCP Cloud Scheduler and Cloud Functions to allow for the running of this job every 7 am & pm, code for that can be found on GCP dashboard. See Thomas for secrets json.

## Requirements
* `requests==2.22.0`
* `pymongo==3.10.1`
* `dnspython==1.16.0`

## Usage

`python data-retrieve.py`