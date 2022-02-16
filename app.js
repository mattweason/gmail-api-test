const session = require('express-session');
const flash = require('connect-flash');
const msal = require('@azure/msal-node');

// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production
app.use(session({
    secret: 'your_secret_value_here',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
}));

// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(function(req, res, next) {
    // Read any flashed errors and save
    // in the response locals
    res.locals.error = req.flash('error_msg');

    // Check for simple error string and
    // convert to layout's expected format
    var errs = req.flash('error');
    for (var i in errs){
        res.locals.error.push({message: 'An error occurred', debug: errs[i]});
    }

    // Check for an authenticated user and load
    // into response locals
    if (req.session.userId) {
        res.locals.user = app.locals.users[req.session.userId];
    }

    next();
});