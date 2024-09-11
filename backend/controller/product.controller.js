
import mongoose from "mongoose"
import Product from "./models/product.model.js";

// api creating product 
export const getProducts=async (req, res) => {

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


}

//delete product
export const deleteProducts= async (req, res) => {

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
}

//get all product
export const getAll=async(req,res)=>{

    try {
        
      const products=  await Product.find({});

      res.status(200).json({
        success:true,
        message:"All products fetched successfully ",
        data:products           
      })

    } catch (error) {   
        
        console.log("error in fetching product",error.message);
        res.status(500).json({
            success:false,
            message:"Not able to fetch all product "
        })
        
    }
}

//update product
export const updateProducts=async (req,res)=>{
    const {id}= req.params;
    const product= req.body
//checking id is valid or not
if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({
        success:false,
        message:"the object id is not valid please fill a valid id "
    })
}
    try {

      const updatedProduct= await Product.findByIdAndUpdate(id,product,{
        new:true
       })

       res.status(200).json({
        success:true,
        message:"prodct deatil updated successfully ",
        data:updatedProduct
       })
        
    } catch (error) {
        console.error(`getting error ${error.message}`)
        res.status(500).json({
            success: false,
            message: "server error "
        })
    }
}