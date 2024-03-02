# Krateo Frontend

## Installation
Clone repository on your machine

Install dependencies
```sh
npm install
```

## Start in local
Launch application
```sh
$ export "VITE_BFF_API_BASE_URL=http://68.219.40.93:8081" && export "VITE_AUTHN_API_BASE_URL=http://51.138.231.131:8080" && npm run dev
```

## Deploying
Build application 
```sh
$ export "VITE_BFF_API_BASE_URL=http://20.105.44.127:8080" && export "VITE_AUTHN_API_BASE_URL=http://51.138.231.131:8080" &&  npm run vite build
```

Copy content of _/build_ folder in your web server
