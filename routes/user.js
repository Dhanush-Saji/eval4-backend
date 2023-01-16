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
    })
  module.exports = {
      userRouter
  }