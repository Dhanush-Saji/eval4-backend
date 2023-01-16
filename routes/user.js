const express = require("express");
const userRouter = express.Router()
const {Usermodel } = require("../model/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const token = process.env.KEY

    userRouter.post("/register", async (req, res) => {
    const {email,gender,password,name} = req.body
    const saltRounds = 5;
      try {
        bcrypt.hash(password,saltRounds,async(err,hash_pass)=>{ 
          if(err){
            res.status(500).send(err)
          }
          else{
            const user = new Usermodel({email,gender,password:hash_pass,name});
            await user.save();
            res.send("User registered successfully");
          }
        })
      } catch (error) {
        console.log(error);
        res.status(500).send("Error");
      }
    });
    userRouter.post('/login',async(req,res)=>{
        let {email,password} = req.body
        try {
          let user = await Usermodel.find({email})
          if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
              if(result){
                let keyToken = jwt.sign({userID:user[0]._id},token)
                res.status(200).send(keyToken)
              }
              else{
                res.status(500).send("Invalid Credential")
              }
            })
          }
          else{
            res.status(500).send("Invalid Credential")

          }
        } catch (error) {
          res.status(500).send(`Something went wrong: ${error}`)
          console.log(error);
        }
    })
  module.exports = {
      userRouter
  }

  // {
  //   "name":"test3",
  //   "email":"test3",
  //   "gender":"test3",
  //   "password":"test3"
  // }

