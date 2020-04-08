# React Front-end Starter Template

Software Stack

- React.js / Redux / React-Router-Dom / Material-UI
- Express Static Server

Utility Package

- Moment.js
- Axios.js
- Redux-Promise

## Environment Variable Setting

Before building a production code you need to set env in `.env.production`:

```
# .env.production file in root directory
REACT_APP_API_SERVER=localhost
REACT_APP_PORT=9000
```

After setting up the env file, run `npm run build` and start a server:

```shell
PORT=3000 node server.js
```

## Package Json Available Script

```json
"scripts": {
  "production": "node server.js",
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```