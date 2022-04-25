require('dotenv').config();
const express = require('express');
const res = require('express/lib/response');
const mongoose = require("./controllers/connection.js");
const app = express();
const PORT = process.env.PORT;
const connectionController = require('./controllers/connection')

const methodOverride = require('method-override')
const product = require("./models/seed.js");
const Products = require('./models/products.js');

//middleware

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"))
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
});

//routes
app.get('/seed', (req, res) => {
    Products.deleteMany({}, (err, deletedProducts) => {
        Products.create(product, (err, data) => {
            res.redirect('/');
        });
    });
});
app.get("/",(req,res)=> {
    res.render('index.ejs', {allProducts: product})
})

//new page
app.get("/new",(req, res) => {
    res.render('new.ejs');
});

app.get('/:id', (req, res) => {
        res.render('show.ejs', {Product: product[req.params.id],
        index: req.params.id})
});


// create - im having trouble making the new item render onto the index
    app.post('/', (req, res) => {
        req.body.completed = !!req.body.completed;
        Products.create(req.body, (err, createdProducts) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.redirect('/');
            };
        });
    });

    
//delete - also when i hit the delete button it doesnt render to the index page.
app.delete("/:id", (req, res) => {
    Products.findByIdAndDelete(req.params.id, (err, deletedProducts) => {  
        res.redirect("/");

    });
});

   //edit route

app.get("/:id/edit",(req, res) => {
              Products.findById(req.params.id, (err, Products) => {
            res.render('edit.ejs', {Prod: product[req.params.id],
            index: req.params.id});
        });
    });

    //update route - when i console.log req.params.id i get the correct info but it will not render the information
app.put('/:id', (req, res)=> {
   
    Products.findByIdAndUpdate(
        req.params.id, 
        req.body,(err, updatedProducts)=>{
        res.redirect("/")
    })

})

//show route
app.get("/:id", (req, res) => {
    res.render('show.ejs', {
        Product: product[req.params.id],
        index: req.params.id
    })
})
   
// listener
app.listen(PORT, () => {
    console.log(`On PORT ${PORT}`);
});