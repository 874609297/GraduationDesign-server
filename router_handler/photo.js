const db = require('../db/mysql')
exports.getPhoto=function(req,res){
    const sql='select * from pic'
    db.query(sql,req,(err,results)=>{
        if (err) return res.errMsg(err)
        if(results.length==0) return res.errMsg("获取失败")
        //图片获取成功
        res.send({
            status:0,
            message:'获取成功',
            data:results
        })
    })
}

//上传图片
exports.uploadPhoto=function(req,res){
    const sql='insert into pic set ?'
    db.query(sql,{base64_data:req.body.base64_data,name:req.body.name},(err,results)=>{
        if (err) return res.errMsg(err)
        //图片上传成功
        res.send({
            status:0,
            message:'上传成功',
            data:results
        })
    })
}


//删除图片
exports.delPhoto=function(req,res){
    const sql = 'delete from pic where id=?'
    db.query(sql,req.body.id,(err,results)=>{
        if (err) return res.errMsg(err)
        if(results.length==0) return res.errMsg("删除失败")
        res.send({
            status:0,
            message:'删除成功',
        })
    })
}
