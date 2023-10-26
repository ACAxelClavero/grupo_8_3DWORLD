const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller = {

    productsCart(req, res) {
        res.render('productCart');
    },

    products(req, res) {
        res.render('products');
    },

    productDetail(req, res) {
        let products = getProducts();
        const product = products.find(product => product.id == req.params.id);
        if (!product) {
			return res.render('not-found');
		}
        res.render('product-detail', { product });
    },

    newProduct(req, res) {
        res.render('new-product');
    },

    newProductCreation (req, res) {
        const products = getProducts();
		const productToCreate = {
			id: products[products.length - 1].id + 1,
			image: 'default-image.png',
			...req.body
		}
		products.push(productToCreate);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');
    },

    editProduct (req, res) {
        res.render('edit-product');
    },

    editProductId (req, res) {
        const products = getProducts();
		const indexProduct = products.findIndex(product => product.id == req.params.id);
		products[indexProduct] = {
			...products[indexProduct],
			...req.body
		};
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');
    },

    delete (req, res) {
        let product = getProducts();
        const indexProduct = product.findIndex(product => product.id == req.params.id);
		product.splice(indexProduct, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(product, null, 2));
		res.redirect('/products');
    },
}

module.exports = controller;