const {User} = require("./db");
const jwtpassword = "varunserver";
const jwt = require("jsonwebtoken");
const userexists = async (req,res,next)=>{
    const {username} = req.headers;
    const users = await User.findOne({username:username});
    if(users)
    {
        return res.status(301).send("user already exists");
    }
    next();
}
const douserexists = async (req,res,next)=>{
    const {username} = req.headers;
    const users = await User.findOne({username:username});
    if(!users)
    {
        return res.status(301).send("user doesn't exists");
    }
    next();
}
const jwtverification = async (req,res,next) =>{
    const token = req.headers.authication.split(" ");
   // console.log(token);
    const decode = jwt.verify(token[1],jwtpassword);
    if(!decode.username)
    {
        return res.status(301).send("access denined");
    }
    req.username = decode.username;
    next();
}
module.exports = {userexists,douserexists,jwtverification};