

function guestMiddleware(req, res, next) {


    if(req.session.user == undefined){
        console.log("Debes loguearte primero")
        res.redirect('login');
    }
    next();
    
}

module.exports = guestMiddleware;




