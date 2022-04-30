require('dotenv').config();
const express = require('express');
const res = require('express/lib/response');
const mongoose = require("./controllers/connection.js");

const PORT = process.env.PORT;
const connectionController = require('./controllers/connection')
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
const product = require("./models/seed.js");
const Products = require('./models/products.js');
const app = express();
//middleware

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"))
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
});

// app.use(bodyParser.json())

//routes
//index
app.get("/",(req,res)=> {
    Products.find({}, (err, allProducts)=>{
        res.render("index.ejs",{
            allProducts: allProducts,
        });
    });
});
app.get('/seed', (req, res) => {
     Products.deleteMany({}, (err, deletedProducts) => {
         Products.create(product, (err, data) => {
             res.redirect('/');
         });
     });
 }); 

 

//new page
app.get("/new",(req, res) => {
    res.render('new.ejs');
});



//delete -
app.delete("/:id", (req, res) => {
    Products.findByIdAndDelete(req.params.id, (err, deletedProducts) => {  
        res.redirect("/");

    });
});   

//update route - when i console.log req.params.id i get the correct info but it will not render the information
app.put('/:id', (req, res)=> {
   
    Products.findByIdAndUpdate(
        req.params.id,
        console.log(Products),
        req.body,(err, updatedProducts)=>{
            if(err) {
                console.log(err);
        res.redirect(`/${req.params.id}`)}
    })

})

// create 
app.post('/', (req, res) => {
 Products.create(req.body, (err, createdProducts) => {
    if (err) {
         res.send(err); 
           }else {
             res.redirect("/");
             }
    });
})

//edit route

app.get("/:id/edit",(req, res) => {
     Products.findById(req.params.id, (err, Prod) => {
            res.render('edit.ejs', {Prod});
        });
    });
 
// // Buy Route
// app.put('/buy/:id', (req, res) => {
//     Products.findById(req.params.id, (err, foundProducts) => {
//         let currentQty = foundProducts.qty
//         let buyQty = req.body.qty
//         if (currentQty - buyQty < 0 ) return res.send('You cant buy that many.')
//         let updatedQty = currentQty - buyQty
//         req.body.qty = updatedQty
//         Products.findByIdAndUpdate(req.params.id, req.body, (err, boughtProducts) => {
//             if (err) console.log(err);
//             res.redirect(`./${req.params.id}`);
//         });
//     })
// });





  //show route
app.get("/:id", (req, res) => {
    Products.findById(req.params.id, (error, foundProducts)=>{
    res.render("show.ejs", {prod: foundProducts,
        index: req.params.id})
    })
})
   
// listener
app.listen(PORT, () => {
    console.log(`On PORT ${PORT}`);
});