const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate'); 
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const LocalStrategy = require('passport-local');
const userController = require('./controllers/user');
const User = require('./models/user');

const userRouter = require('./routes/user');
const dogRouter = require('./routes/dog');
const unitRouter = require('./routes/unit');
const personRouter = require('./routes/person');
const adoptionRouter = require('./routes/adoption');


const app = express();


function jwtSignUser(user){
    const  WEEK = 60*60*24*7;
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: WEEK
    }) 
}

const sessionConfig = {
    name: "_session",
    secret: 'thisismytopsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
} 

app.use(session(sessionConfig));
app.use(flash());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userController.tryLogin(username, password);

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      //console.log("Returned user: ",user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser( (User, done) => {
    done(null, User)
})
passport.deserializeUser((userObj, done) => {
    done (null, userObj )
})

app.use((req,res,next) => {
    console.log('req:', req.user);
    res.locals.currentUser = req.user;
    console.log('Role', res.locals.currentUser);
    //res.locals.success = req.flash('success');
    //res.locals.error = req.flash('error');
    next();
})


app.use('/users', userRouter);
app.use('/dogs', dogRouter);
app.use('/units', unitRouter);
app.use('/people', personRouter);
app.use('/adoptions', adoptionRouter);


app.get('/' , (req,res) => {
    res.redirect('/dogs/overview');
})


app.listen(3000, (req,res) => {
    console.log('Listening on port 3000..');
})
