const jwt = require('jsonwebtoken')
const token = process.env.KEY

const authenticate = (req,res,next)=>{
    const key = req.headers.authorization
    if(key){
        const decoded = jwt.verify(key,token)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }
        else{
            res.status(500).send("Please login")
        }
    }
    else{
        res.status(500).send("Please login")
    }
}

module.exports={
    authenticate
}