var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 留言列表
app.get('/messageList', (req, res) => { 
    var sql = $sql.message.messageList;
    var page = (req.query.page - 1)*8;
    //根据sql语句对数据库进行查询
    conn.query(sql,page, function(err, results) { 
        if (results) {
            let sql1 = 'select count(*) as count from message';
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
            var response = JSON.stringify({code:1,msg:"留言列表查询失败"});
            res.send(response);
        }    
    });
});

// 删除留言
app.post('/deleteMessage',(req, res) => {   
    var id = req.body.id;
    var sql = $sql.message.delMessage;
    var values = [[id]];
    //根据sql语句对数据库进行删除
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"删除成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"留言删除失败"});
            res.send(response);
        }  
    })
});

// 留言详情
app.get('/getMessageDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.message.messageDetail;
    var values = [[id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"留言详情获取失败"});
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







