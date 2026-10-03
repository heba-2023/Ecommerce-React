const User = require('../models/userModel')
const createToken =require('../utils/createToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async(req,res)=>{
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const token = createToken(user._id);
      res.status(201).json({
        data: { _id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  
}



exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    const token = createToken(user._id);
    res.status(200).json({
      data: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.protect = async(req,res,next)=>{
  try{
    let token 
    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(" ")[1]

    }
    if(!token){
     return  res.status(401).json({ message: "You are not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decoded.userId).select('-password');
  if (!currentUser) {
    return res.status(401).json({ message: "User no longer exists" });
  }

  req.user = currentUser;
  next();

  }
  catch(err){
    res.status(401).json({ message: "Invalid or expired token" });
  }
}




exports.allowedTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this route" });
    }
    next();
  };