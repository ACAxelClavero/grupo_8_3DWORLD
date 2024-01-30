function guestMiddleware(req, res, next) {
    if(req.session.userLogged == undefined){
        next();
    }else {
        res.render('/views/user/login.ejs');
    }
}

module.exports = guestMiddleware;




