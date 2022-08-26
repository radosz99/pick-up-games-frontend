![example workflow](https://github.com/radosz99/pick-up-games-frontend/actions/workflows/deploy_actions.yaml/badge.svg)



# Deployment

## Prerequisites
- Node 14.x,
- npm 6.x,
- Python 3.8.x, pip, virtualenv package (optionally if we want to deploy on server via Python script).


## Prepare build
```
$ npm ci  
$ npm run build
```

## Run locally
```
$ npm install -g serve
$ serve -s build
```

## Deployment on server
Python script is preferable.

### Docker
SSH to server and then:
```
$ docker build  -t client .
$ docker run -d -p 3000:3000 client
```

### Python script
It is required to pass 3 arguments to the script:
1. Path to the `build/` directory, either relative or absolute,
2. IP address of the deployment server,
3. Password for root user on the deployment server.

```
$ virtualenv venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
$ python deploy.py <path/to/build/dir> <server_ip> <root_password>
```
