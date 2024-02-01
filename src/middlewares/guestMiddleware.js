const guestMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/user/login'); // O a la página de inicio de sesión
    }
    next();
  };
  
module.exports = guestMiddleware;




