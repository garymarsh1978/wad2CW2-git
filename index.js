
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
app.use(express.urlencoded({ extended: false }));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

const router = require('./routes/pantryRoutes');
app.use('/', router); 

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})
