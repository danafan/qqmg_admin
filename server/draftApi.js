var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var path = require('path');
var fs = require('fs');
var UUID = require('uuid');
var formidable = require('formidable');   //上传功能的插件

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 草稿列表
app.get('/draftList', (req, res) => { 
    var sql = $sql.drafts.draftList;
    //根据sql语句对数据库进行查询
    conn.query(sql, function(err, result) { 
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"草稿箱列表获取失败"});
            res.send(response);
        }    
    });
});

// 添加草稿
app.post('/addDraft',(req, res) => { 
    let group = req.body.group;
    let title = req.body.title;
    let descs = req.body.descs;
    let pageimg = req.body.pageimg;
    let content = req.body.content;
    var createdTime = Date.parse(new Date());
    if(group == 0){
        let ishome = req.body.ishome;
        let isrecom = req.body.isrecom;
        var values = [[group,title,descs,pageimg,content,createdTime,ishome,isrecom]];
        var sql = $sql.drafts.addDraft0;
    }else if(group == 1){
        let author = req.body.author;
        var values = [[group,title,descs,pageimg,content,createdTime,author]];
        var sql = $sql.drafts.addDraft1;
    }else if(group == 2){
        let ishome = req.body.ishome;
        var values = [[group,title,descs,pageimg,content,createdTime,ishome]];
        var sql = $sql.drafts.addDraft2;
    }
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"插入成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"加入草稿失败"});
            res.send(response);
        }  
    })
});

// 删除草稿
app.post('/deleteDraft',(req, res) => {   
    var id = req.body.id;
    var sql = $sql.drafts.delDraft;
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

// 草稿详情
app.get('/getDraftDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.drafts.draftDetail;
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

// 修改草稿
app.post('/updateDraft',(req, res) => {   
    let group = req.body.group;
    let id = req.body.id;
    let title = req.body.title;
    let descs = req.body.descs;
    let pageimg = req.body.pageimg;
    let content = req.body.content;
    var createdTime = Date.parse(new Date());
    if(group == 0){
        let ishome = req.body.ishome;
        let isrecom = req.body.isrecom;
        var values = [title,descs,pageimg,content,createdTime,ishome,isrecom,id];
        var sql = $sql.drafts.updateDraft0;
    }else if(group == 1){
        let author = req.body.author;
        var values = [title,descs,pageimg,content,createdTime,author,id];
        var sql = $sql.drafts.updateDraft1;
    }else if(group == 2){
        let ishome = req.body.ishome;
        var values = [title,descs,pageimg,content,createdTime,ishome,id];
        var sql = $sql.drafts.updateDraft2;
    }
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







