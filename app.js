const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate'); 
const path = require('path');

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
