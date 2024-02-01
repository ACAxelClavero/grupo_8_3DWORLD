const db = require('../../database/models');

async function cookieMiddleware(req, res, next) {
    try {
        if (req.cookies.rememberme && !req.session.user) {
            const user = await db.User.findOne({
                where: {
                    email: req.cookies.rememberme
                }
            });
            if (user) {
                req.session.user = user;
            }
        }
    } catch (error) {
        console.error("Error en cookieMiddleware:", error.message);
    } finally {
        next();
    }
}

module.exports = cookieMiddleware;
