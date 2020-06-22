var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var fs = require('fs');

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 查看图片
app.get('/imgList',(req, res) => {   
    var sql = $sql.imgs.imgList;
    //根据sql语句对数据库进行查询
    conn.query(sql,function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询详情失败"});
            res.send(response);
        }  
    })
});

// 修改图片
app.post('/updateImg',(req, res) => {   
    let id = req.body.id;
    let img = req.body.img;
    var sql = $sql.imgs.updateImg;
    //根据sql语句对数据库进行查询
    conn.query(sql,[img,id],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"修改成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"修改失败"});
            res.send(response);
        }  
    })
});

//删除图片
app.get('/deleteImg',(req,res) => {
    let imgUrl = '../dist/static/uploads/' + req.query.imgurl;
    fs.unlink(imgUrl, function (err) {
        if(err){
            var response = JSON.stringify({code:1,msg:"图片删除失败"});
            res.send(response);
        }else{
            var response = JSON.stringify({code:0,msg:"图片删除成功"});
            res.send(response);
        }
    })
});
// 请求成功后对返回数据的处理
var jsonWrite = function(res, result) {
    var response = JSON.stringify({code:0,data: result});
    res.send(response);
};

module.exports = app;







