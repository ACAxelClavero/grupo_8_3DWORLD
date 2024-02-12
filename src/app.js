// Require
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieMiddleware = require ('../src/middlewares/cookieMiddleware')
const sessionMiddleware = require('../src/middlewares/sessionMiddleware');
const cartMiddleware = require('./middlewares/cartMiddleware');

const cors = require('cors');


// Routes require
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productRoutes');

//Api routes
const apiProductsRoutes = require('./apis/apiRoutes/apiProductsRoutes');
const apiUsersRoutes = require('./apis/apiRoutes/apiUsersRoutes');

// Express
const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Middlewares Globales
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: "3DWorld",
                 resave: false,
                 saveUninitialized: true
                }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(cartMiddleware);
app.use(sessionMiddleware);

app.use(cors({ origin: 'http://localhost:5174' }));

//Rutas
app.use('/', mainRoutes);
app.use('/user', usersRoutes);
app.use('/product', productRoutes);

//Apis
app.use('/api/users', apiUsersRoutes);
app.use('/api/products', apiProductsRoutes);

app.use((req, res, next) => {
    res.status(404).render('not-found');
});

const port = 3017;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});