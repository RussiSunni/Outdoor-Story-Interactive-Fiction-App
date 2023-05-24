// Middleware 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mysql = require('mysql');
const sessions = require('express-session');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  //user: 'root',
  password: 'H3@lthyL1f35tyl3s',
  //password: 'password',
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
 * Login route.
 */
app.get('/', function (req, res, next) {
  res.render('login');
});

// Login API.
app.post('/api/login-attempt', (req, res, next) => {
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
        // session = req.session
        req.session.userId = results[0].id
        req.session.userName = results[0].username
        req.session.isAdmin = results[0].is_admin

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


// Create account route.
app.get('/create-account', function (req, res, next) {
  res.render('create-account');
});


// Create account API.
app.post('/api/create-account', (req, res, next) => {
  //res.setHeader('Content-Type', 'application/json');
  // Check if username already exits.
  let sqlQuery1 = "SELECT * FROM users WHERE users.username = '" + req.body.username + "';";
  let query1 = conn.query(sqlQuery1, (err, results) => {
    try {
      if (err) {
        throw err;
      }
      else {
        if (results.length > 0) {
          res.json({ notification: 'username already exists' });
        }
        else {
          // Check if email address already exits.
          let sqlQuery2 = "SELECT * FROM users WHERE users.email = '" + req.body.email + "';";
          let query2 = conn.query(sqlQuery2, (err, results) => {
            if (results.length > 0) {
              res.json({ notification: 'email address already exists' });
            }
            else {
              // Create account and redirect to login screen.
              let data = { first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, password: req.body.password, email: req.body.email, is_admin: 0, start_date: req.body.current_date };
              let sqlQuery3 = "INSERT INTO users SET ?";
              let query = conn.query(sqlQuery3, data, (err, results) => {
                if (err) {
                  throw err;
                }
                else {
                  res.json({ notification: 'account created' });
                  res.end();
                }
              });
            }
          });
        }
      }
    } catch (err) {
      next(err)
    }
  })
});

/**
 * Admin screen routes -----------------------------------.
 */
// Admin panel route.
app.get('/admin', function (req, res, next) {
  // Check if the user is logged in and an admin.
  var session = req.session;
  if (session.userName && session.isAdmin == 1)
    res.render('admin-panel');
  // Otherwise, redirect to login page.
  else
    res.redirect('/')
});
/**
 * Users.
 */
// List users route.
app.get('/list-users', function (req, res, next) {
  // Check if the user is logged in and an admin.
  var session = req.session;
  if (session.userName && session.isAdmin == 1)
    res.render('list-users');
  // Otherwise, redirect to login page.
  else
    res.redirect('/')
});

// List users API.
app.get('/api/users', function (req, res, next) {
  // Check if the user is logged in and an admin.
  var session = req.session;
  if (session.userName && session.isAdmin == 1) {
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
  }
});

// Show user route and API.
app.get('/show-user/:id', function (req, res, next) {
  // Check if the user is logged in and an admin.
  var session = req.session;
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
});


/**
 * Choices.
 */
// Show choices API.
app.get('/api/choices/:id', function (req, res, next) {
  // Check if the user is logged in and an admin.
  var session = req.session;
  if (session.userName && session.isAdmin == 1) {
    res.setHeader('Content-Type', 'application/json');

    let sqlQuery = `
    SELECT *
    FROM healthy_lifestyles.user_choices
    WHERE healthy_lifestyles.user_choices.user_id = ` + req.params.id + `;`;

    let query = conn.query(sqlQuery, (err, results) => {
      try {
        if (err) {
          throw err;
        }
        else {
          // Remove time from date time.
          for (let i = 0; i < results.length; i++) {
            var dateTime = results[i].date.toString();
            var date = dateTime.substr(4, 11);
            results[i].date = date;
          }
          res.json(results)
        }
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
// Game Route.
app.get('/game', function (req, res, next) {
  // Check if the user is logged in.
  var session = req.session;
  if (session.userName)
    res.render('game', { username: session.userName });

  // Otherwise, redirect to login page.
  else
    res.redirect('/')
});

// Save Choice API.
app.post('/api/save-choice', (req, res, next) => {
  // Check if the user is logged in.
  var session = req.session;
  if (session.userName) {
    // Get current date.
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    var currentDate = year + "-" + month + "-" + date

    // SQL query. 
    let sqlQuery = "INSERT INTO healthy_lifestyles.user_choices (user_id, date, choice_id, choice) values (" + session.userId + ",'" + currentDate + "','" + req.body.choiceId + "','" + req.body.choice + "')";

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
  }
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
