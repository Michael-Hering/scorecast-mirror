[![Build Status](https://travis-ci.com/CUBigDataClass/scorecast.svg?token=pQwb96NqdCVumD2nAxxk&branch=master)](https://travis-ci.com/CUBigDataClass/scorecast)
# Scorecast

## About

Smarter sports betting

## Project structure
This project is split into containerized microservices, using docker.

The basic file structure is as follows:

```
scorecast/
  - react-app/
    - dockerfile
    - ...
  - data/
    - dockerfile
    - ...
  -docker-compose.yml
```

For more information on these services, see the links below:

[React App](https://github.com/CUBigDataClass/scorecast/tree/master/react-app)

## Usage

### Docker
1. [Install Docker](https://docs.docker.com/install/)
2. In terminal, run `docker-compose up` from project root