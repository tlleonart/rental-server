const express = require('express');

const cors = require('cors');

const routerApi = require('./routes');

const {
  logErrors, errorHandler, boomErrorHandler, ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

const port = process.env.PORT;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://rental-app-client.netlify.app', 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Frental-app-server.herokuapp.com%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&scope=email%20profile&client_id=673120548612-hukb89n0hg4lhlpr3jkjf1g2l2cb2j3n.apps.googleusercontent.com'];

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

require('./utils/auth');

routerApi(app);

app.use(logErrors);

app.use(ormErrorHandler);

app.use(boomErrorHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Port: ${port}`);
});
