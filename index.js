
const express = require('express');
const app = express();
require('dotenv').config() // loads data from .env file

const cookieParser = require('cookie-parser')
app.use(cookieParser())
const mustache = require('mustache-express');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
extended: false
}))
const path = require('path');
app.use(express.urlencoded({ extended: false }));

app.engine('mustache', mustache());
const views = path.join(__dirname,'/views');
app.set('views', views);
app.set('view engine', 'mustache');

const public = path.join(__dirname,'/public');
app.use(express.static(public));
const router = require('./routes/pantryRoutes');
app.use('/', router); 

const port = process.env.PORT || 3000;
app.listen(port, () =>
 console.log(
  `Express started on http://localhost:${port}` + "; press Ctrl-C to terminate."
 )
);
