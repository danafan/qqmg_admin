var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句


//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 信息列表
app.get('/infoList', (req, res) => { 
    var sql = 'select * from info left join category on info.level_02_id = category.category_id order by info_id';
    //根据sql语句对数据库进行查询
    conn.query(sql, function(err, result) { 
        if (result) {
            result.map(item => {
                if(item.tag_ids){
                    let dou = item.tag_ids.split("_").join(",");
                    let sql2 = 'select * from tag where tag_id in(' + dou + ')';
                    conn.query(sql2, function(err, result1) { 
                        if (result1) {
                            item.taggss = result1;
                        }   
                    });
                }
            })
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"获取失败"});
            res.send(response);
        }    
    });
});

// 发布信息
app.post('/pushInfo',(req, res) => { 
    req.body.create_time = JSON.stringify(new Date().getTime());
    let keys = [];
    let vals = [];
    for(let key  in req.body){
        keys.push(key)
        if(key != 'diff_data'){
            vals.push(JSON.stringify(req.body[key]))
        }else{
            vals.push("'" + req.body[key] + "'")
        }
    }
    var sql = 'insert into info(' + keys.join(',') + ') values (' + vals.join(',') + ')';
    //根据sql语句对数据库进行插入
    conn.query(sql,function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"发布成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"发布失败"});
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







