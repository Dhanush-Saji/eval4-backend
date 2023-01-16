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
module.exports={
    postRouter
}