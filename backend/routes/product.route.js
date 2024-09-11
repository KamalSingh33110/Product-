import express from "express"
const router = express.Router();
import { getProducts, deleteProducts, getAll, updateProducts } from "../controller/product.controller.js";

 //routes for peroformig operation
router.post("/create", getProducts)
router.delete("/delete/:id", deleteProducts)
router.get("/getall", getAll)
//route for updating product ->put for updating all details and patch for upating few details
router.put("/update/:id", updateProducts)


export default router;