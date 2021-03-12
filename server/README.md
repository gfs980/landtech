# Express.ts Docker
Express.js TypeScript template for backend applications with auto-generated with Docker-Compose deployment and development configuration.
depending on the /server/DockerFile command you will run:
code 'for prod' would be commented out with for prod comment and dev would be commented out with 'for dev'


## To run without docker
you must be in LandTech/server directory

### Install
To install the application, do the following after cloning the repository:
```bash
npm install
```

###For prod
Run these 2 commands: 

1) To build the application:
```bash
npm run build
```

2) And to run the server:
```bash
npm run server
```
MAKE SURE YOU RUN 'npm i' before this


###For dev
Run only 1 and only command npm run dev
MAKE SURE YOU RUN 'npm i' before this

## Codestyle
To check the codestyle (lint), do the following:
```bash
npm run lint
```


## To run with docker 
comeback to the root directory and run 
```bash
docker-compose up --build
```
that will build everything by itself.
Make sure you have docker running on your pc
