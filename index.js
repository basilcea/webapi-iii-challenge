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
