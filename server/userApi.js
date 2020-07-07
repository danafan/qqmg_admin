var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var async = require('async');
var request = require('request');
var WXBizDataCrypt = require('./WXBizDataCrypt.js')

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();
//注册（小程序）
app.post('/register',(req, res) => { 
    var address = req.body.address;
    var openid = req.body.openid;
    var appId = models.AppId;
    var sessionKey = req.body.session_key;
    var encryptedData = req.body.encryptedData;
    var iv = req.body.iv;
    var pc = new WXBizDataCrypt(appId, sessionKey);
    var data = pc.decryptData(encryptedData , iv);
    console.log('解密后 data: ', data)
    // let username = req.body.username;
    // let password = req.body.password;
    // var values = [[username]];
    // var sql = $sql.user.searchUser;
    // // 根据用户名查找是否存在该用户
    // conn.query(sql,[values],function(err,result) {   
    //     if (result) {
    //         //如果查询的数组为空，用户不存在
    //         if(result.length == "0"){
    //             var response = JSON.stringify({code:1,msg:"用户不存在"});
    //             res.send(response);
    //         }else{
    //             let uid = result[0].uid;
    //             let pass = result[0].password;
    //             //如果如果密码相同，登录成功
    //             if(password == pass){
    //                 let userObj = {
    //                     uid: uid,
    //                     username: username,
    //                     password: password
    //                 }
    //                 req.session.userObj = JSON.stringify(userObj); // 登录成功，设置 session
    //                 jsonWrite(res, result);
    //             }else{
    //                 var response = JSON.stringify({code:1,msg:"密码错误"});
    //                 res.send(response);
    //             }
    //         }
    //     }
    //     if (err) {       
    //         var response = JSON.stringify({code:2,msg:"系统错误"});
    //         res.send(response);
    //     }  
    // })
});

//根据用户id获取用户信息(小程序)
app.get('/getUserInfo',(req, res) => { 
    var user_id = req.query.user_id;
    var sql = 'select user.*,(select count(info.create_user_id) from info where user.user_id=info.create_user_id) num from user where user_id = ?'
    var values = [[user_id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            jsonWrite(res, result[0]);
        } 
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }   
    })
});

//获取粉丝总数（小程序，banner暂时还没做）
app.get('/getFansTotal',(req, res) => { 
    let sql = 'select count(*) from user'
    //根据sql语句对数据库进行查询
    conn.query(sql,function(err,result) {   
        if (result) {
            jsonWrite(res, result[0]['count(*)']);
        } 
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }   
    })
});

//根据code获取openid
app.get('/getOpenId',(req, res) => { 
    var code = req.query.code;
    let options = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + models.AppId + "&secret=" + models.AppSecret + "&js_code=" + code + "&grant_type=authorization_code"
    };
    request(options, (error, response, body) => {
        //返回值的字符串转JSON
        let data = JSON.parse(body);
        let openid = data.openid;
        let session_key = data.session_key;
        var response = JSON.stringify({code:0,openid:openid,session_key:session_key});
        res.send(response);
    });
});

//判断根据openid获取用户状态
app.get('/getUserStatus',(req, res) => { 
    let openid = JSON.stringify(req.query.openid) ;
    var sql = 'select * from user where openid = ' + openid;
    conn.query(sql,function(err,result) {   
        if (result) {
            if(result.length > 0){
                let endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).getTime();
                let currentDate = new Date().getTime();
                let userObj = result[0];
                if(!userObj.end_time || (userObj.end_time && (currentDate > parseInt(userObj.end_time)))){
                    let updateSql = 'update user set active_day = ' + (userObj.active_day + 1) + ',end_time = ' + endDate + ' where openid = ' + openid;
                    conn.query(updateSql,function(err,res1) {   
                        if (res1) {
                            console.log("已更新")
                        }
                        if (err) {       
                            var response = JSON.stringify({code:1,msg:"获取失败"});
                            res.send(response);
                        }  
                    })
                }
                var response = JSON.stringify({code:0,userInfo:result[0],msg:"获取成功"});
            }else{
                var response = JSON.stringify({code:0,userInfo:null,msg:"没有该用户"});
            }
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"获取失败"});
            res.send(response);
        }  
    })
});

//获取用户列表(后台)
app.get('/getUserList',(req, res) => { 
    let page = (req.query.page - 1)*req.query.pagesize;
    let pagesize = req.query.pagesize;
    let start_time = req.query.start_time;
    let end_time = req.query.end_time;
    let phone = req.query.phone;
    let status = req.query.status;
    let sqlStr = [];
    if(start_time != ''){
        let ss = 'create_time>=' + "'" + start_time + "'" + ' and create_time<=' + "'" + end_time + "'";
        sqlStr.push(ss);
    }
    if(phone != ''){
        sqlStr.push("phone = " + "'" + phone + "'");
    }
    sqlStr.push("status = " + "'" + status + "'")
    var sql = 'select * from user where ' + sqlStr.join(' and ') + ' order by user_id desc limit ' + page + ',' + pagesize;
    var tasks = {
        data: function(callback) {
            conn.query(sql,function(err, result) {
                callback(err, result); 
            });
        },
        total: function(callback) {
            conn.query('select count(*) from user where ' + sqlStr.join(' and ') + ' order by user_id desc', function(err, result) {
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

//更改用户状态
app.post('/updateUserInfo',(req, res) => { 
    let user_id = req.body.user_id;
    let status = req.body.status;
    var sql = 'update user set status = '+ (status == '1'?'2':'1') +' where user_id = ' + user_id;
    // 修改用户信息
    conn.query(sql,function(err,result) {   
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

//登录（后台）
app.post('/login',(req, res) => { 
	let username = req.body.username;
	let password = req.body.password;
	var values = [[username]];
	var sql = $sql.user.searchUser;
    // 根据用户名查找是否存在该用户
    conn.query(sql,[values],function(err,result) {   
    	if (result) {
        	//如果查询的数组为空，用户不存在
        	if(result.length == "0"){
        		var response = JSON.stringify({code:1,msg:"用户不存在"});
        		res.send(response);
        	}else{
        		let uid = result[0].uid;
        		let pass = result[0].password;
        		//如果如果密码相同，登录成功
        		if(password == pass){
        			let userObj = {
        				uid: uid,
        				username: username,
        				password: password
        			}
        			req.session.userObj = JSON.stringify(userObj); // 登录成功，设置 session
        			jsonWrite(res, result);
        		}else{
        			var response = JSON.stringify({code:1,msg:"密码错误"});
        			res.send(response);
        		}
        	}
        }
        if (err) {       
        	var response = JSON.stringify({code:2,msg:"系统错误"});
        	res.send(response);
        }  
    })
});

//退出登录（后台）
app.get('/exit',(req, res) => { 
	// 清空session
	// req.session.destroy();
	var response = JSON.stringify({code:0,msg:"退出成功"});
    res.send(response);
});

// 请求成功后对返回数据的处理
var jsonWrite = function(res, result) {
	var response = JSON.stringify({code:0,data: result});
	res.send(response);
};

module.exports = app;







