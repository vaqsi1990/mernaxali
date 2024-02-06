const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path")
const cookieParser = require('cookie-parser')
const app = express();
const authRoute = require("./routes/auth")

const DB = "mongodb+srv://vaqsi24:juventus1990@shop.31bo5lw.mongodb.net/foodBlog?w=majority";

app.use(cookieParser())
app.use(express.json())



const allowedOrigins = [''https://mernapp-v40n.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "./frontend/build")))

//midlewares
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/", authRoute)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
  })

mongoose
  .connect(DB)
  .then(result => {
    app.listen(4500);
    console.log('working');
  })
  .catch(err => {
    console.log(err);
  });
