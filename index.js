// code away!
const User = require('./users/userDb')
const validateUserId = async (req , res , next) => {
    const {id} = req.params
   try{const data =  await User.getById(id)
    if(!data){
        return res.status(400).json({message: "invalid user id"})      
    }
    req.user = data
    next()
}catch(err){
    return res.status(500).json(err.toString())
}
}

const validateUser = async (req , res , next) => {
    const {name} = req.body
   try{
    if(!req.body){
        return res.status(400).json({message: "missing user data"})      
    }
    if(!name){
        return res.status(400).json({message: "missing required name field"})  
    }
    next()
}catch(err){
    return res.status(500).json(err.toString())
}
}

const validatePost = async (req , res , next) => {
    const {text} = req.body
   try{
    if(!req.body){
        return res.status(400).json({message: "missing post data"})      
    }
    if(!text){
        return res.status(400).json({message: "missing required text field"})  
    }
    next()
}catch(err){
    return res.status(500).json(err.toString())
}
}

