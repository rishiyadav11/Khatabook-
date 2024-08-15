const express = require('express')
const router = express.Router()
const { loginUser,registerUser,getUserprofile,logoutUser} = require("../controllers/authcontrollers")
const authProtect = require("../middlewares/authprotect")
const validateUserData = require("../middlewares/uservalidate")
router.post('/register',validateUserData,registerUser)

router.post('/login',validateUserData,loginUser)

router.post('/logout',logoutUser)

router.get("/islogin",authProtect,(req, res) =>{
    res.json({
        name:req.user.name,
        isAuthenticated:true,
        bgcolor:req.user.bgcolor,
    })
})

router.get('/profile',authProtect,getUserprofile)

module.exports = router