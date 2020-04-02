// app.js and pug setup from learnnode.com by Wes Bos
const express = require('express');
const routes = require('./routes/index');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public/')));

//all routes in a separated file
app.use('/', routes);

module.exports = app;