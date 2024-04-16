
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

const public = path.join(__dirname,'public');
app.use("/css", express.static(__dirname + "/public/css"));
app.use(express.static(public));

const views = '/app/views';
app.engine('mustache', mustache());
console.log(views);
console.log(__dirname);
app.set('views', views);
app.set('view engine', 'mustache');


const router = require('./routes/pantryRoutes');
app.use('/', router); 

const port = process.env.PORT || 3000;
app.listen(port, () =>
 console.log(
  `Express started on http://localhost:${port}` + "; press Ctrl-C to terminate."
 )
);
