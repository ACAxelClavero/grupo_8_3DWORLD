const express=require("express");
const path=require("path");

const mainRoutes = require('./routes/mainRoutes');

const app=express();

app.use(express.static(path.resolve(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', mainRoutes);

app.use('/productCart', mainRoutes);

app.use('/product-detail', mainRoutes);

app.use('/register', mainRoutes); 

app.use('/login', mainRoutes);


const port=3017;
app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});