const express = require('express');

const session = require('express-session');

const passport = require('passport');

const cors = require('cors');

const routerApi = require('./routes');

const {
  logErrors, errorHandler, boomErrorHandler, ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

const port = process.env.PORT;

app.use(express.json());

const whitelist = [];

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
  resave: true,
  secret: 'rentalApp',
  saveUninitialized: true,
}));

app.use(passport.initialize());

app.use(passport.session());

require('./utils/auth');

routerApi(app);

app.use(logErrors);

app.use(ormErrorHandler);

app.use(boomErrorHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Port: ${port}`);
});
