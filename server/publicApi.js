var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var path = require('path');
var fs = require('fs');
var UUID = require('uuid');
var formidable = require('formidable');       //上传功能的插件

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 上传图片
app.post('/uploadImg',(req, res) => {   
    var form = formidable.IncomingForm({
       encoding : 'utf-8',                  //上传编码
       uploadDir : "../dist/static/uploads",//上传目录，指的是服务器的路径，如果不存在将会报错。
       keepExtensions : true,               //保留后缀  
       maxFieldsSize : 2 * 1024 * 1024      //byte//最大可上传大小
   });
    form.parse(req, function (err, fields, files) {
        var imgObj = files.addImgList;
        // 获取原来的图片路径和图片名
        var oldpath = imgObj.path;
        // 生成新路径和图片名（修改图片名字）
        var uuid = UUID.v1();
        var newname = uuid + imgObj.name;
        var newpath = '../dist/static/uploads/' + newname;
        //修改服务器内图片名并上传
        fs.rename(oldpath,newpath,(err)=>{
            if(err){
                var response = JSON.stringify({code:1,msg:"图片上传失败"});
                res.send(response);
            }else{
                var response = JSON.stringify({code:0,msg:"图片上传并保存成功",data:{imgName:newname}});
                res.send(response);
            }
        })
    });
});

// 请求成功后对返回数据的处理
var jsonWrite = function(res, result) {
    var response = JSON.stringify({code:0,data: result});
    res.send(response);
};

module.exports = app;