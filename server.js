require('dotenv').config();
const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;

const methodOverride = require('method-override')
const product = require("./models/seed.js")

//middleware

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"))


//routes
app.get("/",(req,res)=> {
    res.render('index.ejs', {allProducts: product})
})
app.get("/:id", (req, res) => {
    res.render('show.ejs', {
        products: product[req.params.id],
        index: req.params.id
    })
})
   
// listener
app.listen(PORT, () => {
    console.log(`On PORT ${PORT}`);
});