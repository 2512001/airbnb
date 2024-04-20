if (process.env.node_env != 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const expressError = require('./uitls/expressErr.js');
var session = require('express-session');
// const MongoStore = require('connect-mongo');
var flash = require('connect-flash');
const passport = require('passport');
const Localstratigy = require('passport-local');
const User = require('./models/user.js');

//router
const listingsrouter = require('./router/listing.js');
const reviewsrouter = require('./router/review.js');
const userrouter = require('./router/user.js');

// getting-started.js

// localdatabase
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/travelstay');
  console.log('database is connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//env
const mongodbUrl = process.env.mongodbAtlasUrl;


// async function connectToDatabase() {
//     try {
//         await mongoose.connect(mongodbUrl);
//         console.log('Database connected');
//     } catch (error) {
//         console.error('Error connecting to database:', error);
//     }
// }

// connectToDatabase();


// const store = MongoStore.create({
//     mongoUrl: mongodbUrl,
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 1 * 60 * 60

// });

// store.on('error', () => {
//     console.log('mondb session error', err);
// });

const sessions = {
    // store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }

}

// Set up middleware
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, '/public')));
app.use(session(sessions));
app.use(flash());

//authintication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstratigy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//local res variable storing
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curruser = req.user;
    next();
});

//router
app.use('/listing', listingsrouter);
app.use('/listing/:id/review', reviewsrouter);
app.use('/', userrouter);

//page not found
app.all('/*', (req, res, next) => {
    next(new expressError(404, 'Page not found'));
});

//custom error sending here
app.use((err, req, res, next) => {
    let { status = 500, message = 'Something wrong with the server' } = err;
    res.status(status).render('listing/err.ejs', { err });

});

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

