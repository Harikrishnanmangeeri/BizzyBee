const express =require('express')
var userRouter =express.Router()
const controller =require('../Controller/user.controller')

userRouter.post('/user/registration',controller.registration)
userRouter.post('/user/login',(controller.login))
userRouter.get('/user/profile',(controller.profile))
module.exports=userRouter