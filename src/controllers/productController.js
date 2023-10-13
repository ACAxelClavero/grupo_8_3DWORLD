const controller = {

    productCart(req, res){
        res.render('productCart');
    },

    productDetail(req, res){
        res.render('product-detail');
    },

    newProduct(req, res){
        res.render('new-product');
    },

    editProduct (req, res) {
        res.render('edit-product');
    }
}
module.exports = controller;