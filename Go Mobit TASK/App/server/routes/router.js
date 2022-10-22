// Api's
const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");/*db called*/

// ADD / Register user Data

router.post("/create", (req,res) =>{
    // console.log(req.body);

    const {name, email, age, mobile, work, add, desc} = req.body

    // If the input is Empty Throw ERROR
    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("PLZ fill all the data")
    }

    try {/*Check data by Email */
        conn.query("SELECT * FROM curduser WHERE email = ?", email,(err, result)=>{
            if(result.length){/*Check For Dublicate Data Input from the user*/
                res.status(422).json("This Data already EXIST")
            }else{/*Update the Table with new data from the user*/
                conn.query("INSERT INTO curduser SET ?", {name, email, age, mobile, work, add, desc},(err, result)=>{
                    if(err){
                        console.log("err" + err);
                    }else{
                        res.status(201).json(req.body)
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error)
    }
});


// (http) Get user Data > Method  API
// Display to fronEnd from the Database

router.get("/getusers", (req,res) =>{

    conn.query("SELECT * FROM curduser",(err, result)=>{
        if(err){
            res.status(422).json("Nodata Available");
        }else{
            res.status(201).json(result);
        }
    })
});

//deleteuser Api
// Display to fronEnd from the Database

router.delete("/deleteuser/:id", (req,res) =>{

    const {id} = req.params;

    conn.query("DELETE FROM curduser WHERE id =?",id,(err, result)=>{ /* Passing the ID recive through req.params and match it with delete button id */
        
        if(err){
            res.status(422).json("ERROR");
        }else{
            res.status(201).json(result);
        }
    })
});

// get single user Profile

router.get("/induser/:id", (req,res) =>{

    const {id} = req.params;

    conn.query("SELECT * FROM curduser WHERE id =?",id,(err, result)=>{ /* Passing the ID recive through req.params and match it with delete button id */
        
        if(err){
            res.status(422).json("ERROR");
        }else{
            res.status(201).json(result);
        }
    })
});

// update user API

router.patch("/updateuser/:id", (req,res) =>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE curduser SET ? WHERE id =?",[data,id],(err, result)=>{ /* Passing the ID recive through req.params and match it with delete button id */
        
        if(err){
            res.status(422).json({message: "ERROR"});
        }else{
            res.status(201).json(result);
        }
    })
});

// update user API


module.exports = router;