// Middleware 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const sessions = require('express-session');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions.
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

// A variable to save a session.
var session =
{
  userId: null,
  userName: null,
  isAdmin: null
};


/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  user: 'root',
  password: 'H3@lthyL1f35tyl3s',
  password: 'password',
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

/**
 * Login screen route.
 */
app.get('/', function (req, res, next) {
  res.render('index');
});

/**
 * Admin screen routes.
 */


/**
 * Users.
 */
// List users.
app.get('/list-users', function (req, res, next) {
  // Check if the user is logged in.
  if (session.userName && session.isAdmin == 1)
    res.render('list-users');

  // Otherwise, redirect to login page.
  else
    res.redirect('/')
});

// Show user.
app.get('/show-user/:id', function (req, res, next) {
  // Check if the user is logged in.
  if (session.userName && session.isAdmin == 1) {

    let sqlQuery = `
    SELECT *
    FROM healthy_lifestyles.users
    WHERE healthy_lifestyles.users.id = ` + req.params.id + `;`;

    let query = conn.query(sqlQuery, (err, results) => {
      try {
        if (err) {
          throw err;
        }

        res.render('show-user', { user: results[0] });
      } catch (err) {
        next(err)
      }
    });
  }

  // Otherwise, redirect to login page.
  else
    res.redirect('/')
});


/**
 * Game screen route.
 */
app.get('/game', function (req, res, next) {
  // Check if the user is logged in.
  if (session.userName)
    res.render('game', { username: session.userName });

  // Otherwise, redirect to login page.
  else
    res.redirect('/')
});


// List users.
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
        // Create user session object.
        session = req.session
        session.userId = results[0].id
        session.userName = results[0].username
        session.isAdmin = results[0].is_admin

        if (results[0].is_admin == 1) {
          res.json({ account: 'authorized-admin' })
        }
        else {
          res.json({ account: 'authorized-student' })
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


app.post('/api/save-choice', (req, res, next) => {
  // Get current date.
  var date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  var currentDate = year + "-" + month + "-" + date

  // SQL query.
  let sqlQuery = "INSERT INTO healthy_lifestyles.choices (user_id, date, " + req.body.choiceNumber + ") values (" + session.userId + ",'" + currentDate + "','" + req.body.choice + "')";
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
