const express =require('express')
const router =express.Router()
//导入验证表单规则的中间件
const expressJoi = require('@escook/express-joi')
//导入验证规则对象
const {reg_login_schema} = require('../scheam/user')


const userHandler = require('../router_handler/user')
//注册路由
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

//登录路由
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

module.exports = router