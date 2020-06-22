var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var path = require('path');
var fs = require('fs');
var UUID = require('uuid');
var formidable = require('formidable');       //上传功能的插件
var async = require('async');

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 我的日志列表
app.get('/logList', (req, res) => { 
    var sql = $sql.logs.logList;
    var page = (req.query.page - 1)*5;
    var tasks = {
        data: function(callback) {
            conn.query(sql,page,function(err, result) {
                callback(err, result); 
            });
        },
        total: function(callback) {
            conn.query('select count(*) from logs', function(err, result) {
                callback(err, result[0]['count(*)']);
            });
        }
    };
    async.series(tasks, function(err, results) {
        if(err) {
            var response = JSON.stringify({code:1,msg:"我的日志发表失败"});
            res.send(response);
        } else {
            let obj = {code:0};
            obj.total = results.total;
            obj.data = results.data;
            var response = JSON.stringify(obj);
            res.send(response);
        }
    });
});

// 添加我的日志
app.post('/addLog',(req, res) => { 
    let title = req.body.title;
    let descs = req.body.descs;
    let pageimg = req.body.pageimg;
    let content = req.body.content;
    var createdTime = Date.parse(new Date());
    var values = [[title,descs,pageimg,content,createdTime]];
    var sql = $sql.logs.addLog;
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"插入成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"我的日志发表失败"});
            res.send(response);
        }  
    })
});

// 删除我的日志
app.post('/deleteLog',(req, res) => {   
    var id = req.body.id;
    var sql1 = $sql.logs.delLog;
    var sql2 = 'delete from commentary where wid = ' + id;
    var tasks = [function(callback) {
        // 开启事务
        conn.beginTransaction(function(err) {
            callback(err);
        });
    }, function(callback) {  
        conn.query(sql1,id,function(err, result) {  
            callback(err);  
        });
    }, function(callback) {
        conn.query(sql2,id,function(err, result) { 
            callback(err); 
        });
    }, function(callback) {
        // 提交事务
        conn.commit(function(err) {
            callback(err);
        });
    }];
    async.series(tasks, function(err, results) {
        if(err) {
            conn.rollback(); // 发生错误事务回滚
        }
        var response = JSON.stringify({code:0,mag:"删除成功"});
        res.send(response);
    });

});

// 我的日志详情
app.get('/getLogDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.logs.logDetail;
    //根据sql语句对数据库进行查询
    conn.query(sql,id,function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询详情失败"});
            res.send(response);
        }  
    })
});

// 修改我的日志
app.post('/updateLog',(req, res) => {   
    var id = req.body.id;                   //id
    var title = req.body.title;             //标题
    var descs = req.body.descs;             //简介
    var pageimg = req.body.pageimg;         //封面图
    var createdTime = Date.parse(new Date());
    var content = req.body.content;         //内容
    var sql = $sql.logs.updateLog;
    var values = [title,descs,pageimg,content,createdTime,id];
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







