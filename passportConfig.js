const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      console.log('WHAT', req);
    return next(); 
  }
  res.redirect('/users/login');
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/users/login")
}

module.exports = {
  checkAuthenticated,
}