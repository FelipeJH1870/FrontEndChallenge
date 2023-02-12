const createError = require('http-errors');
const express = require("express")

const exphbs =  require("express-handlebars");

const bodyParser = require("body-parser")
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const { dirname, join } = require("path");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// create our express app
const app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// config view engine
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: {
      ifEquals: function (arg1, arg2, options) {
        // console.log('arg1 -> ', arg1, ' arg2 -> ', arg2, '\n');
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      },
      formatDateToNow: date => {
        //console.log("\n...format date -> ", date);
  
        //const formatDistance = parseISO(date, { addSuffix: true, includeSeconds: true });
        //console.log("\n...format formatDistance -> ", formatDistanceToNow(date, { addSuffix: true, includeSeconds: true }));
  
        return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
      },
      formatDate: value => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(value)
      }
    }
  
  });
app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// route
//const routes = require('./routes/Routes')
//app.use('/', routes)
app.use('/', indexRouter);
//app.use('/users', usersRouter);

// public folder
//app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "static")));
app.use(express.static(join(__dirname, "vendor")));
app.use(express.static(join(__dirname, "scripts")));

//start server
app.listen(3000, () => {
    console.log("\nlisteniing at port:3000 \n")
}) 