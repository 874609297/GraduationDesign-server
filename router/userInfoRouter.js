const express =require('express')

const router = express.Router()

const userInfoHandler = require('../router_handler/userInfo')

//获取所有用户信息
router.get('/alluserinfo',userInfoHandler.getAllUserInfo)

//获取单个用户userinfo
router.get('/oneuserinfo/',userInfoHandler.getInfo)

//更改用户信息
router.post('/changeUserInfo',userInfoHandler.changeUserInfo)

//删除用户
router.post('/deleteUserInfo',userInfoHandler.deleteUserInfo)
module.exports=router