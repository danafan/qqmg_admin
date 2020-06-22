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

// 技术分享列表
app.get('/shareList', (req, res) => { 
    var sql = $sql.shares.shareList;
    var page = (req.query.page - 1)*5;
    //根据sql语句对数据库进行查询
    conn.query(sql, page,function(err, results) { 
        if (results) {
            let sql1 = 'select count(*) as count from shares';
            conn.query(sql1,function(err, result) { 
                if (result) {
                    var response = JSON.stringify({code:0,total:result[0].count,data: results});
                    res.send(response);
                }
                if (err) {       
                    var response = JSON.stringify({code:1,msg:"技术分享列表获取失败"});
                    res.send(response);
                }    
            });
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }    
    });
});

// 添加技术分享
app.post('/addShare',(req, res) => { 
    let title = req.body.title;
    let descs = req.body.descs;
    let pageimg = req.body.pageimg;
    let content = req.body.content;
    var createdTime = Date.parse(new Date());
    let ishome = req.body.ishome;
    let isrecom = req.body.isrecom;
    var values = [[title,descs,pageimg,content,createdTime,ishome,isrecom]];
    var sql = $sql.shares.addShare;
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"插入成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"技术分享发表失败"});
            res.send(response);
        }  
    })
});

// 删除技术分享
app.post('/deleteShare',(req, res) => {   
    var id = req.body.id;
    var sql = $sql.shares.delShare;
    var values = [[id]];
    //根据sql语句对数据库进行删除
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"删除成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"删除失败"});
            res.send(response);
        }  
    })
});

// 技术分享详情
app.get('/getShareDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.shares.shareDetail;
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

// 修改技术分享
app.post('/updateShare',(req, res) => {   
    var id = req.body.id;                   //id
    var ishome = req.body.ishome;           //首页
    var isrecom = req.body.isrecom;         //推荐
    var title = req.body.title;             //标题
    var pageimg = req.body.pageimg;         //封面图
    var descs = req.body.descs;             //简介
    var createdTime = Date.parse(new Date());
    var content = req.body.content;         //内容
    var sql = $sql.shares.updateShare;
    var values = [title,descs,pageimg,content,createdTime,ishome,isrecom,id];
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







