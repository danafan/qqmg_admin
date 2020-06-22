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

// 最近在读列表
app.get('/readList', (req, res) => { 
    var sql = $sql.readings.readList;
    //根据sql语句对数据库进行查询
    conn.query(sql, function(err, result) { 
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }    
    });
});

// 添加最近在读
app.post('/addReading',(req, res) => { 
    let name = req.body.name;
    let author = req.body.author;
    let descs = req.body.descs;
    let url = req.body.url;
    let pageimg = req.body.pageimg;
    var values = [[name,author,descs,url,pageimg]];
    var sql = $sql.readings.addRead;
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"插入成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"最近在读添加失败"});
            res.send(response);
        }  
    })
});

// 删除最近在读
app.post('/deleteRead',(req, res) => {   
    var id = req.body.id;
    var sql = $sql.readings.delRead;
    var values = [[id]];
    //根据sql语句对数据库进行删除
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"删除成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"书籍删除失败"});
            res.send(response);
        }  
    })
});

// 最近在读详情
app.get('/getReadDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.readings.readDetail;
    var values = [[id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询详情失败"});
            res.send(response);
        }  
    })
});

// 修改最近在读
app.post('/updateRead',(req, res) => {   
    var id = req.body.id;                   //id
    let name = req.body.name;
    let author = req.body.author;
    let descs = req.body.descs;
    let url = req.body.url;
    let pageimg = req.body.pageimg;
    var values = [name,author,descs,url,pageimg,id];
    var sql = $sql.readings.updateRead;
    //根据sql语句对数据库进行查询
    conn.query(sql,values,function(err,result) {   
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

// 请求成功后对返回数据的处理
var jsonWrite = function(res, result) {
    var response = JSON.stringify({code:0,data: result});
    res.send(response);
};

module.exports = app;







