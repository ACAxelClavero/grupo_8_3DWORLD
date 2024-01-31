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
          console.error(`Error fetching product: ${error.message}`);
          console.error(error.stack);
          res.render('error');
          console.error(error);
          res.render('error');
        }
    },
        

    // Detalle de un producto especifico
    async productDetail(req, res) {
        try {
            const productId = parseInt(req.params.id, 10);
            const product = await Product.findByPk(productId);
    
            if (!product) {
                return res.render('not-found');
            }
    
            res.render('product-detail', { product });
        } catch (error) {
            console.error('Error fetching product:', error);
            console.error(`Error fetching product: ${error.message}`);
            console.error(error.stack);
            res.render('error');
        }
    },

     // Creacion de un nuevo producto
     newProductForm(req, res) {
        res.render('new-product');
        
     },
     async newProductCreation(req, res) {
      console.log('Ruta de creación de producto alcanzada');

        try {
          console.log('Contenido de req.body:', req.body);
          console.log('Contenido de req.files:', req.files);
          const productToCreate = {
            name: req.body.name,
            color: req.body.color,
            price: req.body.price,
            photo1: req.files[0].filename,
            photo2: req.files[1].filename,
            photo3: req.files[2].filename,
            photo4: req.files[3].filename,
            materials: req.body.materials,
            size: req.body.size,

		}
        const newProduct = await Product.create(productToCreate);
        res.redirect('/products');
      } catch (error) {
        console.error(`Error fetching product: ${error.message}`);
        console.error(error.stack);
        res.status(500).render('error', { error });
        res.render('/error')
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
            console.error(`Error fetching product: ${error.message}`);
            console.error(error.stack);
            res.render('error');
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
            photo1: req.files[0].filename,
            photo2: req.files[1].filename,
            photo3: req.files[2].filename,
            photo4: req.files[3].filename,
            materials: req.body.materials,
            size: req.body.size,
          };
      
          await Product.update(updatedProduct, {
            where: { id: productId }
          });
      
          res.redirect('/products');
        } catch (error) {
          console.error(`Error updating product: ${error.message}`);
          console.error(error.stack);
          res.render('error');
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
          console.error(`Error fetching product: ${error.message}`);
          console.error(error.stack);
          res.render('error');
            console.error('Error during product deletion by ID:', error);
            res.render('error'); 
        }
    },
};

module.exports = controller;