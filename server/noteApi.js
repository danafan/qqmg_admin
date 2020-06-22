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

// 读书笔记列表
app.get('/noteList', (req, res) => { 
    var sql = $sql.notes.noteList;
    var page = (req.query.page - 1)*5;
    //根据sql语句对数据库进行查询
    conn.query(sql,page,function(err, results) { 
        if (results) {
            let sql1 = 'select count(*) as count from notes';
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

// 添加读书笔记
app.post('/addNote',(req, res) => { 
    let title = req.body.title;
    let author = req.body.author;
    let descs = req.body.descs;
    let pageimg = req.body.pageimg;
    let content = req.body.content;
    var createdTime = Date.parse(new Date());
    var values = [[title,author,descs,pageimg,content,createdTime]];
    var sql = $sql.notes.addNote;
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"插入成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"读书笔记发表失败"});
            res.send(response);
        }  
    })
});

// 删除读书笔记
app.post('/deleteNote',(req, res) => {   
    var id = req.body.id;
    var sql = $sql.notes.delNote;
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

// 读书笔记详情
app.get('/getNoteDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.notes.noteDetail;
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

// 修改读书笔记
app.post('/updateNote',(req, res) => {   
    var id = req.body.id;                   //id
    var title = req.body.title;             //书名
    var author = req.body.author;           //作者
    var descs = req.body.descs;             //简介
    var pageimg = req.body.pageimg;         //封面图
    var createdTime = Date.parse(new Date());
    var content = req.body.content;         //内容
    var sql = $sql.notes.updateNote;
    var values = [title,author,descs,pageimg,content,createdTime,id];
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







