const db = require('../db/mysql')

exports.getAllUserInfo=function(req,res){
    const sql = 'select * from user'
    db.query(sql,req,(err,results)=>{
        if (err) return res.errMsg(err)
        if(results.length==0) return res.errMsg("获取失败")
        res.send({
            status:0,
            message:'获取成功',
            data:results
        })
    })
}


//更改用户信息
exports.changeUserInfo=function(req,res){
    const sql = 'update user set username=?,nickname=?,phone=?,email=? where id=?'
    db.query(sql,[req.body.username,req.body.nickname,req.body.phone,req.body.email,req.body.id],(err,results)=>{
        if (err) return res.errMsg(err)
        if(results.length==0) return res.errMsg("修改失败")
        res.send({
            status:0,
            message:'修改成功',
        })
    })
}

//删除用户信息
exports.deleteUserInfo=function(req,res){
    const sql = 'delete from user where id=?'
    db.query(sql,req.body.id,(err,results)=>{
        if (err) return res.errMsg(err)
        if(results.length==0) return res.errMsg("删除失败")
        res.send({
            status:0,
            message:'删除成功',
        })
    })
}
//根据角色id获取信息
exports.getInfo=function(req,res){
    const sql = 'select * from user where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        if (err) return res.errMsg(err)
        if(results.length==0) return res.errMsg("获取失败")
        res.send({
            status:0,
            message:'获取成功',
            data:results
        })
    })
}