//Dependencies

const mongoose = require("../controllers/connection") //import the already connected object

//Schemas & Models

//schema the definition of our data type

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
}, {timestamps: true});

//model the object for working with our data type
const Products = mongoose.model("Products", productSchema)

//export the model

module.exports = Products