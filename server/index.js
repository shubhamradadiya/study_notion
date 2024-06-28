const  express = require('express');
const  app = express();

const  dotenv = require("dotenv")
dotenv.config();

const database = require("./config/database")
const cloudinary = require("./config/cloudinary")

const cookiesParser = require("cookie-parser");
const  cors =require("cors");
const fileUpload = require ("express-fileupload")

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const  PORT = process.env.PORT || 4000;
//database connection
database.connect();

//middleware
app.use(express.json());
app.use(cookiesParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"./tmp"
    })
)

//cloudinary connection
cloudinary.cloudinaryConnect();


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/",(req, res) =>{
    return res.json({
        success: true,
        message: "Your server is running"
    })
})

//app  listen 
app.listen(PORT ,()=>{
    console.log(`App Running in port ${PORT}`);
})