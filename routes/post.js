const express = require("express");
const postRouter = express.Router()
const {Postmodel } = require("../model/post.model");
const {authenticate} = require('../middleware/authenticator.middleware')


postRouter.use(authenticate)
postRouter.get('/',async(req,res)=>{
    try {
        const post = await Postmodel.find({})
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send(error)
    }
})

postRouter.post('/create',async(req,res)=>{
    const payload = req.body
    try {
        const post = new Postmodel(payload)
        const datas = await post.save()
        res.status(200).send(datas)
    } catch (error) {
        res.status(500).send(error)
    }
})
postRouter.patch('/update/:id',async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    const post = await Postmodel.findOne({_id:ID})
    const userID_in_posts = post.userID
    const userID_in_req = req.body.userID
    try {
        if(userID_in_posts != userID_in_req){
            res.status(500).send("You can't perform this action")
        }
        else{
            await Postmodel.findByIdAndUpdate({_id:ID},payload)
            res.status(200).send("Updated")
        }
    } catch (error) {
        res.status(500).send("You can't perform this action")
    }
    

})

postRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    const post = await Postmodel.findOne({_id:ID})
    const userID_in_posts = post.userID
    const userID_in_req = req.body.userID
    try {
        if(userID_in_posts != userID_in_req){
            res.status(500).send("You can't perform this action")
        }
        else{
            await Postmodel.findByIdAndDelete({_id:ID},payload)
            res.status(200).send("Deleted")
        }
    } catch (error) {
        res.status(500).send("You can't perform this action")
    }
    

})
module.exports={
    postRouter
}