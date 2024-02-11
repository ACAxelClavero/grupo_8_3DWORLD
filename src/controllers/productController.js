const path = require('path');
const fs = require('fs');

const { Product } = require('../../database/models')
const { Op } = require('sequelize');


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
                  models: product.models,
                  size: product.size
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

     // Accion de creacion
     async newProductCreation(req, res) {
      console.log('Ruta de creación de producto alcanzada');

        try {
          console.log('Contenido de req.body:', req.body);
          console.log('Contenido de req.files:', req.files);

          let filenames = []; // Array para almacenar los nombres de los archivos

          if (req.files && req.files.length > 0) {
              // Si req.files está definido y tiene al menos 1 elemento
  
              // Iterar sobre los archivos en req.files
              for (let i = 0; i < 4; i++) {
                  // Si hay un archivo en la posición i, obtener su nombre, de lo contrario, usar la imagen predeterminada
                  const filename = req.files[i] ? req.files[i].filename : '../../images/logo.png';
                  filenames.push(filename); // Agregar el nombre del archivo al array
              }
          } else {
              // Si no se subieron archivos, llenar el array con la imagen predeterminada
              for (let i = 0; i < 4; i++) {
                  filenames.push('../../images/logo.png');
              }
          }
  
          const productToCreate = {
              name: req.body.name,
              description: req.body.description,
              models: req.body.models,
              price: req.body.price,
              photo1: filenames[0],
              photo2: filenames[1],
              photo3: filenames[2],
              photo4: filenames[3],
              materials: req.body.materials,
              size: req.body.size,
          };

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
          console.log('Existing Product Photos:', existingProduct.photos);

          const updatedProduct = {
            name: req.body.name,
            description: req.body.description,
            color: req.body.color,
            price: req.body.price,

            materials: req.body.materials,
            size: req.body.size,
          };
          updatedProduct.photos = [
            existingProduct.photo1,
            existingProduct.photo2,
            existingProduct.photo3,
            existingProduct.photo4
        ];
          if (req.files && req.files.length > 0) {
            updatedProduct.photos = req.files.map(file => file.filename);
          } 

          await Product.update(updatedProduct, {
            where: { id: productId }
          });
      
          res.redirect('/product');
        } catch (error) {

          console.error(`Error updating product: ${error.message}`);
          console.error(error.stack);
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
            res.redirect('/product');
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
  
          // Filtra el producto del carrito que coincide con el productId
          const updatedCart = cart.filter(product => product.id !== productId);
  
          req.session.cart = updatedCart; // Actualiza el carrito en la sesión
           
          console.log('Producto eliminado exitosamente del carrito');
      } catch (error) {
          console.error(`Error durante la eliminación del producto del carrito: ${error.message}`);
          console.error(error.stack);
          res.render('error');
      }
  },
  //buscador
  async search(req, res) {
    try {
        const searchTerm = req.query.searchTerm;
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });
        res.render('products', { products }); 
      } catch (error) {
        console.error(`Error searching products: ${error.message}`);
        console.error(error.stack);
        res.render('not-found');
        }
    },
};

module.exports = controller;