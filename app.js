var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
/* GET home page. */

// Middleware 
const mysql = require('mysql');

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  // user: 'root',
  password: 'H3@lthyL1f35tyl3s',
  // password: 'password',
  database: 'healthy_lifestyles'
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MariaDB connected...');
});


// Routes.
app.get('/', function (req, res, next) {
  res.render('index');
});


app.get('/admin', function (req, res, next) {
  res.render('admin-panel');
});


app.get('/api/users', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let sqlQuery = "SELECT * FROM healthy_lifestyles.users;";
  let query = conn.query(sqlQuery, (err, results) => {
    try {
      if (err) {
        throw err;
      }
      else {
        res.json(results);
      }
    } catch (err) {
      next(err)
    }
  });
});


app.get('/game', function (req, res, next) {
  var username = req.query.username;
  res.render('game', { username: username });
});


// Login.
app.post('/login-attempt', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  // Execute SQL query that'll select the account from the database based on the specified username and password.
  let sqlQuery1 = "SELECT * FROM healthy_lifestyles.users WHERE healthy_lifestyles.users.username = '" + req.body.username + "' AND healthy_lifestyles.users.password = '" + req.body.password + "';";
  let query1 = conn.query(sqlQuery1, (err, results) => {
    try {
      if (err) {
        throw err;
      }
      // If record is found.
      else if (results.length > 0) {
        if (results[0].is_admin == 1) {
          res.redirect('/admin');
        }
        else {
          res.json({ account: 'authorized' })
        }
      }
      else {
        // If both the username and password are not correct, check if the account exists.
        let sqlQuery2 = "SELECT * FROM healthy_lifestyles.users WHERE healthy_lifestyles.users.username = '" + req.body.username + "';";
        let query2 = conn.query(sqlQuery2, (err, results) => {
          try {
            if (err) {
              throw err;
            }
            // Tell user their password is incorrect.
            else if (results.length > 0) {
              res.json({ account: 'wrong-password' })
            }
            // If neither the username or password are correct, let user know.
            else {
              res.json({ account: 'no-account' })
            }
          } catch (err) {
            next(err)
          }
        });
      }
    } catch (err) {
      next(err)
    }
  });
});


app.post('/test', (req, res, next) => {
  console.log("test111111")
  let sqlQuery = "INSERT INTO healthy_lifestyles.choices (user_id, choice_001) values (1, 1)";
  let query = conn.query(sqlQuery, (err, results) => {
    try {
      if (err) {
        throw err;
      }
      else {
        res.end();
      }
    } catch (err) {
      next(err)
    }
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
