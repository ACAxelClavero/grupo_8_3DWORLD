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
    // Añadir producto al carrito
    addToCart(req, res) {
      const productId = req.params.id;
      Product.findByPk(productId)
          .then((product) => {
              if (!product) {
                  return res.render('not-found');
              }

              req.session.cart = req.session.cart || [];
  
              req.session.cart.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  photo: product.photo1,
              });
              console.log('Producto agregado al carrito:', product.name);

              req.session.save(() => {
                res.render('productCart', { cart: req.session.cart });
              });
        })
          .catch((error) => {
              console.error(`Error fetching product: ${error.message}`);
              console.error(error.stack);
              return res.status(500).render('error', { error }); // Cambiado aquí
            });
  },
     // Creacion de un nuevo producto
     newProductForm(req, res) {
      const product = {};
        res.render('new-product', { product });
        
     },
     async newProductCreation(req, res) {
      console.log('Ruta de creación de producto alcanzada');

        try {
          console.log('Contenido de req.body:', req.body);
          console.log('Contenido de req.files:', req.files);
          const productToCreate = {
            name: req.body.name,
            description: req.body.description,
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
        res.redirect('/product');
      } catch (error) {
        console.error(`Error fetching product: ${error.message}`);
        console.error(error.stack);
        res.status(500).render('error', { error });
        res.render('/error')
    }
},
    // Edicion de un producto 
    editProductForm(req, res) {

      if (!req.session.user) {
        return res.redirect('user/login');
      }

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
          });
      },
    
    editProductId: async (req, res) => {
        try {
          const productId = req.params.id;
          console.log('Product ID:', productId);
    
          const existingProduct = await Product.findByPk(productId);

          const updatedProduct = {
            name: req.body.name,
            description: req.body.description,
            color: req.body.color,
            price: req.body.price,
            photo1: req.files[0].filename,
            photo2: req.files[1].filename,
            photo3: req.files[2].filename,
            photo4: req.files[3].filename,
            materials: req.body.materials,
            size: req.body.size,
          };
          
          if (req.files && req.files.length > 0) {
            updatedProduct.photo1 = req.files[0].filename;
            updatedProduct.photo2 = req.files[1].filename;
            updatedProduct.photo3 = req.files[2].filename;
            updatedProduct.photo4 = req.files[3].filename;
          } else {
            updatedProduct.photo1 = existingProduct.photo1;
            updatedProduct.photo2 = existingProduct.photo2;
            updatedProduct.photo3 = existingProduct.photo3;
            updatedProduct.photo4 = existingProduct.photo4;
          }

          await Product.update(updatedProduct, {
            where: { id: productId }
          });
      
          res.redirect('/product');
        } catch (error) {

          console.error(`Error updating product: ${error.message}`);
          console.error(error.stack);
          res.render('error');
          console.error('Error during product update by ID:', error);
          res.render('error'); 
        }
      },

    // Eliminar un producto
    deleteProduct: async (req, res) => {
        try {
          console.log('Llegó a la función de eliminación');
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
    await Product.destroy({
                where: { id: productId }
            });         
               console.log('Producto eliminado exitosamente');
            res.redirect('/');
        } catch (error) {
        console.error(`Error during product deletion by ID: ${error.message}`);
          console.error(error.stack);
            res.render('error'); 
        }
    },
    
    // eliminar producto de carrito 
    deleteFromCart: (req, res) => {
      try {
      const productId = req.params.id;
      const cart = req.session.cart || [];

      const updatedCart = cart.filter(product => product.id !== productId);

      req.session.cart = updatedCart;

        console.log('Producto eliminado exitosamente del carrito');

        res.redirect('/productCart');
      } catch (error) {
          console.error(`Error durante la eliminación del producto del carrito: ${error.message}`);
          console.error(error.stack);
          res.render('error');
      }
  }
};

module.exports = controller;