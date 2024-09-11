import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import express from "express";
const app = express();//calling function

app.use(express.json());//allow us to parse json  data  in req.body 

//route for home
app.get("/", (req, res) => {

    res.send("server is ready ")
})

// api creating product 
app.post("/api/products", async (req, res) => {

    const product = req.body; //means user will send this data

    //authentication of fields
    if (!product.name || !product.image || !product.price) {
        return res.status(400).json({
            success: false,
            message: "please fill all reqire fields "
        });

    }


    //creating new product
    const newProduct = new Product(product)   /*here "Product" is product model and "product" is actucal product getting form the user */

    //saving to database
    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "product added successfully "
        })
    } catch (error) {
        console.error(`getting error ${error.message}`)
        res.status(500).json({
            success: false,
            message: "server error "
        })
    }


})

//deleting product
app.delete("/api/products/:id", async (req, res) => {

    const {id}= req.params// dstructing the id from url  req.body 
    console.log(id);

    // checking in data base 
try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
        sucess:true,
        message:"given id product is deleted from database "
    })

} catch (error) {
    console.error(`getting error ${error.message}`)
    res.status(500).json({
        success: false,
        message: "not able to delete the data "
    })
}
})



//listing to port
app.listen(5000, () => {

    connectDB();
    console.log(`server started at http://localhost:5000  `);

});



