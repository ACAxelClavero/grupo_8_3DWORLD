const express=require("express");
const path=require("path");
const port=3017;
const app=express();
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "views/home.html"));
});

app.get("/carritoDeCompras", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "views/carritoDeCompras.html"));
});

app.get("/detalleProducto", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "views/detalleProducto.html"));
});

app.get("/formularioRegistro", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "views/formularioRegistro.html"));
});

app.get("/formularioIngreso", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "views/formularioIngreso.html"));
});

app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});