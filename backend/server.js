import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js"
import express, { json } from "express";

const app = express();//calling function

app.use(express.json());//allow us to parse json  data  in req.b    ody 

//route for home
app.get("/", (req, res) => {

    res.send("server is ready ")
})
//routes or api 
app.use("/api/products",router);


//listing to port
app.listen(5000, () => {

    connectDB();
    console.log(`server started at http://localhost:5000  `);

});



