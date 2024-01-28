const path = require('path');
const fs = require('fs');

const { Product } = require('../../database/models')


const controller = {
    // Carrito de compras
    productCart(req, res){
        res.render('productCart');
    },

    // Mostrar todos los productos
    async products(req, res) {
        try {
          const products = await Product.findAll();
          res.render('products', { products });
        } catch (error) {
          console.error(error);
          res.render('error');
        }
    },
        

    // Detalle de un producto especifico
    async productDetail(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
    
            if (!product) {
                return res.render('not-found');
            }
    
            res.render('product-detail', { product });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.render('error');
        }
    },

     // Creacion de un nuevo producto
     newProductForm(req, res) {
        res.render('new-product');
     },
     async newProductCreation(req, res) {
        try {
          const productToCreate = {
            name: req.body.name,
            color: req.body.color,
            price: req.body.price,
            photo1: req.body.photo1,
            photo2: req.body.photo2,
            photo3: req.body.photo3,
            photo4: req.body.photo4,
            materials: req.body.materials,
            size: req.body.size,

		}
	
        const newProduct = await Product.create(productToCreate);
        res.redirect('/new-product');
      } catch (error) {
        console.error(error);
        res.render('error')
    }
},
    // Edicion de un producto 
    editProductForm(req, res) {
        const productId = req.params.id;
        Product.findByPk(productId)
          .then((product) => {
            if (!product) {
              return res.render('not-found');
            }
            res.render('edit-product', { product }); 
          })
          .catch((error) => {
            console.error('Error during rendering edit product form:', error);
            res.render('error');
          });
      },
    
    editProductId: async (req, res) => {
        try {
          const productId = req.params.id;
          const updatedProduct = {
            name: req.body.name,
            color: req.body.color,
            price: req.body.price,
            photo1: req.body.photo1,
            photo2: req.body.photo2,
            photo3: req.body.photo3,
            photo4: req.body.photo4,
            materials: req.body.materials,
            size: req.body.size,
          };
      
          await Product.update(updatedProduct, {
            where: { id: productId }
          });
      
          res.redirect('/products');
        } catch (error) {
          console.error('Error during product update by ID:', error);
          res.render('error'); 
        }
      },
    // Eliminar un producto
    delete: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
    
            if (!product) {
                return res.render('not-found'); 
            }
    
            await Product.destroy({
                where: { id: productId }
            });
    
            res.redirect('/products');
        } catch (error) {
            console.error('Error during product deletion by ID:', error);
            res.render('error'); 
        }
    },
};

module.exports = controller;