const express = require('express')

const app = express()
const bodyParser = require('body-parser');

//配置跨域中间件
const cors = require('cors')
const Joi = require('joi')
app.use(cors())

//配置静态资源中间件
app.use(express.static('static'))


app.use(express.urlencoded({extended:false}))
//错误信息中间件
app.use((req,res,next)=>{
    res.errMsg = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

//解析token中间件
const config =require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({
    secret:config.jwtSecretKey,
}).unless({
    path:[/^\/api\//]
}))

// 全局错误中间件
app.use((err,req,res,next)=>{
    if (err instanceof Joi.ValidationError) {
        return res.errMsg(err)
    }
    if(err.name=='UnauthorizedError') return res.errMsg('身份认证失败')
    res.errMsg(err)
})


//导入注册登录路由模块
app.use('/api',require('./router/userRouter'))
//导入用户信息模块
app.use('/my',require('./router/userInfoRouter'))
//导入图片信息模块
app.use('/photo',require('./router/photorouter'))

app.listen(3007,()=>{
    console.log("listen");
})