const express = require('express');

const cors = require('cors');

const session = require('express-session');
const routerApi = require('./routes');

const {
  logErrors, errorHandler, boomErrorHandler, ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

const port = process.env.PORT;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://rental-app-client.netlify.app', 'https://rental-app-server.herokuapp.com'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed By CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(session({
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true,
}));

require('./utils/auth');

routerApi(app);

app.use(logErrors);

app.use(ormErrorHandler);

app.use(boomErrorHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Port: ${port}`);
});
