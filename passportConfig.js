const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userController = require('./controllers/user');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
          const user = await userController.tryLogin(username, password);
    
          if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
          }
    
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      })
  );
  
passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
    const user = await userController.findUserById(id);
    done(null, user);
} catch (err) {
    done(err);
}
});
  
module.exports = passport;