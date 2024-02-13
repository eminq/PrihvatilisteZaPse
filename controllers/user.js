const User = require('../models/user');
const userService = require('../services/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../passportConfig');

function jwtSignUser(user){
    const  WEEK = 60*60*24*7;
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: WEEK
    }) 
}

module.exports.renderRegisterForm = (req,res) => {
    res.render('users/register')
}

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login');
}

module.exports.login = passport.authenticate('local', {
    successRedirect: '/dogs/overview',
    failureRedirect: '/users/login',
    failureFlash: true, // Enable flash messages for failed login attempts
  });

// module.exports.login = async (req,res) => {
//     const { username, password } = req.body;
//     const users = await userService.getUsers();
//     for(let user of users){
//         if(user.username === username){
//             const hash = await bcrypt.compare(password, user.password);
//             if(hash){
//                 console.log('logged in');
//                 req.session.user = user;
//                 console.log('User set: ', req.session.user)
//                 return res.redirect('/dogs/overview');
//                 // return res.json({
//                 //     response: true,
//                 //     user: user,
//                 //     token: jwtSignUser(user)
//                 // });
//             }else{
//                 console.log('incorrect credentials');
//                 return res.json({
//                     response: false,
//                     message: 'Incorrect credentials!'
//                 });
//             }
//         }
//     }
//     return res.json({
//         response: false,
//         message: 'Incorrect credentials!'
//     });
// };

module.exports.findUserById = async (id) => {
    try{
        const user = await userService.findUser(id);
        return user;
    }catch(err){
        return res.json({
            response: false,
            message: 'Error!'
        });
    }
}


module.exports.tryLogin = async (username, password) => {
    const users = await userService.getUsers();
    for(let user of users){
        if(user.username === username){
            const hash = await bcrypt.compare(password, user.password);
            if(hash){
                return user;
            }else{
                console.log('incorrect credentials');
                return res.json({
                    response: false,
                    message: 'Incorrect credentials!'
                });
            }
        }
    }
    return res.json({
        response: false,
        message: 'Incorrect credentials!'
    });
};


module.exports.logout = (req,res) => {
    req.logout(function(err){
        if(err) return next(err);
        req.flash('success', 'You are logged out!');
        res.redirect('/users/login');
    });
}

module.exports.register = async(req,res) => {
    try{
        const { username, password, role, personId, shelterId } = req.body;
        console.log(username, password, role, shelterId);
        const hash = bcrypt.hashSync(password, 10);
        console.log(hash);
        const newUser = new User(username, hash, role, personId, shelterId);
        console.log(newUser);
        const result = await userService.addUser(newUser);
        const user = result[0];
        console.log(user);
        if(result){
            console.log('added');
            return res.json({
                response: true,
                user: user,
                token: jwtSignUser(user)
            });
        }else{
            console.log('error');
            return res.json({
                response: false,
                message: 'Error!'
            });
        }
    }catch(err){
        console.log('error');
        return res.json({
            response: false,
            message: 'Error!'
        });
    }
} 