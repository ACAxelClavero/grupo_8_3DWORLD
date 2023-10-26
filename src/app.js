const express=require("express");
const path=require("path");
const methodOverride =  require('method-override');

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productRoutes');

const app=express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(methodOverride('_method'));

//app.use((req, res, next) => { 
//    res.status(404).render("not-found")
//});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoutes);
app.use('/user', usersRoutes); 
app.use('/product', productRoutes);

const port=3017;
app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});