var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var async = require('async');
var fs = require('fs');


//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 信息列表（小程序）
app.get('/infoList', (req, res) => { 
    var page = (req.query.page - 1)*8;
    if(req.query.level_01_id == 0){
        var sql = 'select * from info left join category on info.level_02_id = category.category_id order by info_id desc limit ' + page + ',' + 8;
    }else if(req.query.search_txt){
        let search_txt = req.query.search_txt;
        var sql="select * from info left join category on(info.level_02_id = category.category_id) where category_name like '%" + search_txt + "%' or category_desc like '%" + search_txt + "%' order by info_id desc limit " + page + ',' + 8;
    }else{
        let keys = [];
        let vals = [];
        for (var key in req.query) {
            if(key != 'page'){
                keys.push(key);
                vals.push(req.query[key]);
            }
        }
        var sql = 'select * from info left join category on(info.level_02_id = category.category_id) where ' + keys.join(' and ') + ' in(' + vals.join(',') + ') order by info_id desc limit ' + page + ',' + 8;
    }
    // console.log(sql)
    //根据sql语句对数据库进行查询
    conn.query(sql, function(err, result) { 
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"获取失败"});
            res.send(response);
        }    
    });
});
// 信息列表（后台）
app.get('/adminInfoList', (req, res) => { 
    let page = (req.query.page - 1)*req.query.pagesize;
    let pagesize = req.query.pagesize;
    let push_start_time = req.query.push_start_time;
    let push_end_time = req.query.push_end_time;
    let create_user_nickname = req.query.create_user_nickname;
    let browse_num = req.query.browse;
    let sqlStr = [];
    if(push_start_time != ''){
        let ss = 'create_time>=' + "'" + push_start_time + "'" + ' and create_time<=' + "'" + push_end_time + "'";
        sqlStr.push(ss);
    }
    if(create_user_nickname != ''){
        sqlStr.push("create_user_nickname = " + "'" + create_user_nickname + "'");
    }
    if(browse_num != ''){
        sqlStr.push('browse_num = ' + browse_num);
    }
    var sql = ''
    if(sqlStr.length > 0){
        sql = 'select * from info left join category on(info.level_02_id = category.category_id) where ' + sqlStr.join(',') + ' order by info_id desc limit ' + page + ',' + pagesize;
    }else{
        sql = 'select * from info left join category on(info.level_02_id = category.category_id) order by info_id desc limit ' + page + ',' + pagesize;
    }
    var tasks = {
        data: function(callback) {
            conn.query(sql,page,function(err, result) {
                callback(err, result); 
            });
        },
        total: function(callback) {
            conn.query('select count(*) from info', function(err, result) {
                callback(err, result[0]['count(*)']);
            });
        }
    };
    async.series(tasks, function(err, results) {
        if(err) {
            var response = JSON.stringify({code:1,msg:"获取失败"});
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

// 发布信息
app.post('/pushInfo',(req, res) => { 
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

// 下架信息
app.post('/deleteInfo',(req, res) => {   
    var info_id = req.body.info_id;
    var file_list = req.body.filelist;
    var sql = 'delete from info where info_id = ?';
    var values = [[info_id]];
    //根据sql语句对数据库进行删除
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            if(file_list){
                file_list.split("_").map(item => {
                    let imgUrl = '../dist/static/uploads/' + item;
                    fs.unlink(imgUrl, function (err) {})
                });
            }
            var response = JSON.stringify({code:0,msg:"删除成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"删除失败"});
            res.send(response);
        }  
    })
});

// 信息详情
app.get('/getInfoDetail',(req, res) => {   
    var id = req.query.info_id;
    var sql = 'select * from info left join category on info.level_02_id = category.category_id where info_id = ?';
    var values = [[id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var resObj = result[0];
            var sqls = {
                data: function(callback) {
                    let browse_num = resObj.browse_num + 1;
                    let sql2 = 'update info set browse_num = '+ browse_num +' where info_id = ' + id;
                    conn.query(sql2, function(err, res2) { 
                     callback(err, resObj);  
                 });
                },
                name: function(callback) {
                    let sql3 = 'select category.category_name from category where category.category_id = ' + resObj.p_id;
                    conn.query(sql3, function(err, res3) {
                        callback(err, res3);
                    });
                }
                
            };
            async.series(sqls, function(err, results) {
                if(err) {
                    var response = JSON.stringify({code:1,msg:"获取失败"});
                    res.send(response);
                } else {
                    let obj = {code:0};
                    let data = results.data;
                    data.cate_01_name = results.name[0].category_name;
                    obj.data = data;
                    var response = JSON.stringify(obj);
                    res.send(response);
                }
            });

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







