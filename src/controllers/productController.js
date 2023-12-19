const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller = {
    // Carrito de compras
    productCart(req, res){
        res.render('productCart');
    },
        // Mostrar todos los productos
    products(req, res) {
        const products = getProducts();
        res.render('products', { products });
    },
        // Detalle de un producto especifico
        productDetail(req, res) {
            const products = getProducts();
            const product = products.find(product => product.id == req.params.id);
            if (!product) {
                return res.render('not-found');
            }
            res.render('product-detail', { product });
        },
         // Creacion de un nuevo producto
    create (req, res) {
        res.render('new-product');
    },

    newProductCreation (req, res) {
        const products = getProducts();
		const productToCreate = {
			id: products[products.length - 1].id + 1,
			image: req.file?.filename || 'default-image.png',
			...req.body
		}
		products.push(productToCreate);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/');
    },

    // Edicion de un producto 
    editProduct (req, res) {
        const products = getProducts();
		const product = products.find(product => product.id == req.params.id);
		res.render('edit-product', { productToEdit: product});
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

    update (req, res) {
        const products = getPitchs();
        const productIndex = products.findIndex(element => element.id == req.params.id);
        const img = req.file?.filename || products[productIndex].img;
        products[productIndex] = {
            ...products[pitchIndex],   
            img,
            ...req.body
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/')
    },


    // Eliminar un producto
    delete (req, res) {
        const products = getProducts();
        const indexProduct = product.findIndex(product => product.id == req.params.id);
		product.splice(indexProduct, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(product, null, 2));
		res.redirect('/products');
    },
}

module.exports = controller;