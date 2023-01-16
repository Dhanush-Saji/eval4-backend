const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: {type:String},
    body: {type:String},
    device: {type:String},
    userID:{type:String}
  });
  
  const Postmodel=mongoose.model("PostCollection",postSchema)

  module.exports={
    Postmodel
  }