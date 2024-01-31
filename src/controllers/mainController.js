const controller = {
    index(req, res){
        const user = req.session.user
        res.render('index', {user});
    },
    
    productCart(req, res){
        const user = req.session.user
        res.render('productCart', {user});
    },

    productDetail(req, res){
        const user = req.session.user
        res.render('product-detail', {user});
    },

    newProduct(req, res){
        const user = req.session.user
        res.render('new-product', {user});
    },
    nosotros(req, res) {
        const user = req.session.user
        res.render('nosotros', {user});
    },
    plasticos(req, res) {
        const user = req.session.user
        res.render('plasticos', {user});
    }
}

module.exports = controller;