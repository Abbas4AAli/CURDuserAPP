const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("./db/conn");
const router = require("./routes/router")
const port = 8001;


//  app.get("/" ,(req , res) => {
//     res.send("Server Start")
//  });

//middleware
app.use(express.json());
app.use(cors());

app.use(router);

 app.listen(port, () =>{
    console.log("Serve is running on :" + port)
 })