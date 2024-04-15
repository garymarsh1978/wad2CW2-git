
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
app.set('view engine', 'mustache');
app.set('views', path.join(process.cwd(), 'views'));


const public = path.join(process.cwd(),'public');
app.use(express.static(public));
const router = require('./routes/pantryRoutes');
app.use('/', router); 

const port = process.env.PORT || 3000;
app.listen(port, () =>
 console.log(
  `Express started on http://localhost:${port}` + "; press Ctrl-C to terminate."
 )
);
