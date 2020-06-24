var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 查询模版
app.get('/getTempList', (req, res) => { 
    var sql = $sql.categorys.tempList;
    //根据sql语句对数据库进行查询
    conn.query(sql,function(err, result) { 
        if (result) {
            var response = JSON.stringify({code:0,data: result});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }   
    });
});
// 获取一级二级分类列表
app.get('/getCategoryList', (req, res) => { 
    var sql = $sql.categorys.categoryList;
    var p_id = req.query.p_id;
    var values = [[p_id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err, result) { 
        if (result) {
            var response = JSON.stringify({code:0,data: result});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }   
    });
});
// 添加分类
app.post('/addCategory',(req, res) => { 
    let sort_id = req.body.sort_id;
    let category_name = req.body.category_name;
    let temp_id = req.body.temp_id;
    var values = [];
    var sql = null;
    if(req.body.p_id && req.body.category_desc){
        let p_id = req.body.p_id;
        let category_desc = req.body.category_desc;
        values = [[p_id,sort_id,category_name,temp_id,category_desc]];
        sql = $sql.categorys.addCategory02;
    }else{
        values = [[sort_id,category_name,temp_id]];
        sql = $sql.categorys.addCategory;
    }
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"添加成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"添加失败"});
            res.send(response);
        }  
    })
});
// 删除分类
app.post('/deleteCategory',(req, res) => {   
    var category_id = req.body.category_id;
    var sql = $sql.categorys.deleteCategory;
    var values = [[category_id]];
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
// 分类详情
app.get('/getCategoryDetail',(req, res) => {   
    var category_id = req.query.category_id;
    var sql = $sql.categorys.categoryDetail;
    var values = [[category_id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }  
    })
});
// 修改分类
app.post('/updateCategory',(req, res) => {   
    var category_id = req.body.category_id;                   
    var sort_id = req.body.sort_id;           
    var category_name = req.body.category_name; 
    var temp_id = req.body.temp_id;     
    var values = [];
    var sql = null;
    if(req.body.category_desc){
        let category_desc = req.body.category_desc;
        values = [sort_id,category_name,temp_id,category_desc,category_id];
        sql = $sql.categorys.updateCategory02;
    }else{
        values = [sort_id,category_name,temp_id,category_id];
        sql = $sql.categorys.updateCategory;
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
// 获取三级标签列表
app.get('/getTagList', (req, res) => { 
    var sql = $sql.categorys.tagList;
    var cate_id = req.query.cate_id;
    var values = [[cate_id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err, result) { 
        if (result) {
            var response = JSON.stringify({code:0,data: result});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }   
    });
});
// 添加标签
app.post('/addTag',(req, res) => { 
    let sort_id = req.body.sort_id;
    let cate_id = req.body.cate_id;
    let tag_name = req.body.tag_name;
    var values = [[sort_id,cate_id,tag_name]];
    var sql = $sql.categorys.addTag;
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"添加成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"添加失败"});
            res.send(response);
        }  
    })
});
// 删除标签
app.post('/deleteTag',(req, res) => {   
    var tag_id = req.body.tag_id;
    var sql = $sql.categorys.delTag;
    var values = [[tag_id]];
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
// 标签详情
app.get('/getTagDetail',(req, res) => {   
    var tag_id = req.query.tag_id;
    var sql = $sql.categorys.tagDetail;
    var values = [[tag_id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }  
    })
});
// 修改标签
app.post('/updateTag',(req, res) => {   
    var tag_id = req.body.tag_id;                   
    var sort_id = req.body.sort_id;           
    var tag_name = req.body.tag_name;        
    var sql = $sql.categorys.updateTag;
    var values = [sort_id,tag_name,tag_id];
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
//获取二级分类和标签列表（发布页面）
app.get('/getCateAndTag',(req, res) => {   
    var category_id = req.query.category_id;
    var sql1 = 'select category_desc,temp_id from category where category_id = ?';
    var req1 = [[category_id]];
    //根据sql语句对数据库进行查询
    conn.query(sql1,[req1],function(err,res1) {   
        if (res1) {
            var res1 = res1;
            var sql2 = 'select tag_id,tag_name from tag where cate_id = ?';
            var req2 = [[category_id]];
            //根据sql语句对数据库进行查询
            conn.query(sql2,[req2],function(err,res2) {   
                if (res2) {
                    let resObj = res1[0];
                    resObj.tags = res2;
                    jsonWrite(res, resObj);
                }
                if (err) {       
                    var response = JSON.stringify({code:1,msg:"查询失败"});
                    res.send(response);
                }  
            })
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
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







