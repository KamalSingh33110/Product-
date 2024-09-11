import mongoose from "mongoose";
//creating schema
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true// created at and updated at field
}
)
                        //collection of Product->mongoose automatically convert it to products
const Product= mongoose.model("Product",productSchema);
export default Product;