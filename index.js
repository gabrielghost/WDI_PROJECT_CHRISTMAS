const express         = require('express');
const morgan          = require('morgan');
const ejsLayouts      = require('express-ejs-layouts');
const methodOverride  = require('method-override');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const router          = require('./config/routes');

const app             = express();
const port            = process.env.PORT || 3000;

const databaseName    = 'music_library';
const databaseUrl     = `mongodb://localhost/${databaseName}`;



mongoose.connect(databaseUrl, () => {
  return console.log(`connected to db: ${databaseUrl}`);
});

//Settings setup

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//Middleware setup


app.use(morgan('dev'));
app.use(express.static(`${__dirname}/bower_components`));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(ejsLayouts);
app.use('/', router);

app.listen(port, () => console.log(`Started on port: ${port}`));
