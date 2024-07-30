// console.log("backend")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))

// VERCEL
const cors = require('cors');
// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(cors({
  origin: 'https://yourdeployedsite.com'
}));

const PORT = process.env.PORT || 8080

// mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to Databse"))
    .catch((err) => console.log(err));
//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmpassword: String,
    image: String,
})

// 
const userModel = mongoose.model("user", userSchema);


// api
app.get("/", (req, res) => {
    res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;

        const result = await userModel.findOne({ email: email });

        if (result) {
            return res.send({ message: "Email id is already registered", alert: false }); // Model.findOne() no longer accepts a callback

        }

        const data = new userModel(req.body);
        await data.save();
        res.send({ message: "Successfully signed up", alert: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error signing up" });
    }
});


//api login 
app.post("/login", async (req, res) => {
    console.log(req.body)
    const { email } = req.body
    const result = await userModel.findOne({ email: email })

    if (result) {
        const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image: result.image,
        }
        console.log(dataSend)
        return res.send({ message: "Login is successfully", alert: true, data: dataSend })
    }
    else{
        return res.send({ message: "Email is not available, please sign up", alert: false })
    }
})

// product section 

const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
})

const productModel = mongoose.model("product", schemaProduct )


// save product in data 
// api 
app.post("/uploadProduct", async (req, res)=> {
    console.log(req.body)
    
    const data = await productModel(req.body)
    const datasave = await data.save()

    res.send({message: "Upload successfully"})
})

//
app.get("/product",async (req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})



// server is running 
app.listen(PORT, () => console.log("server is running at port : " + PORT))
