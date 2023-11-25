//注册路由处理函数
const db = require('../db/mysql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.regUser=(req,res)=>{
    const userInfo = req.body
    if (!userInfo.username||!userInfo.password) {
        return res.errMsg('用户名或密码不合法')
    }

    const selectSQL = "select * from user where username=?"
    db.query(selectSQL,userInfo.username,(err,results)=>{
        if (err) {
            return res.errMsg(err.message)
        }
        if (results.lenght>0) {
            return res.errMsg('用户名已被占用，请更换为其他用户名')
        }
        //密码加密
        userInfo.password=bcrypt.hashSync(userInfo.password,10)
        const insertSQL = "insert into user set ?"
        db.query(insertSQL,{username:userInfo.username,password:userInfo.password},(err,results)=>{
            if(err) return res.errMsg(err)

            if(results.affectedRows!==1) return res.errMsg('注册失败')
            return res.send({status:0,message:"注册成功"})
        })
    })
}
//登录路由处理函数
exports.login=(req,res)=>{
    const userInfo = req.body
    const selectSQL = "select * from user where username=?"
    db.query(selectSQL,userInfo.username,(err,results)=>{
        if(err) return res.errMsg(err)
        if(results.length !==1) return res.errMsg('登录失败')
        //对比输入密码与数据库中密码是否一致，返回boolean
        const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
        if (!compareResult) {
            return res.errMsg("密码错误，登录失败")
        }

        //生成token
        //清除密码和头像信息
        const user = {...results[0],password:'',pic:''}
        const tokenStr =jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer '+tokenStr
        })
    })
}

