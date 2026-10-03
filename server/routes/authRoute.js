const express = require('express')
const { signup, login, protect } = require("../service/authService");

const router = express.Router()


router.route('/signup').post(signup)
router.route('/login').post(login)
 router.get("/me", protect, (req, res) => {
   res.status(200).json({ data: req.user });
 });


module.exports=router