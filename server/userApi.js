var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

//判断用户是否为登录状态
app.get('/state',(req, res) => { 
	if(req.session.userObj){
		let userObj = JSON.parse(req.session.userObj);
		var response = JSON.stringify({code:0,msg:"用户已登录",userObj:userObj});
        res.send(response);
	}else{
		var response = JSON.stringify({code:1,msg:"用户未登录"});
        res.send(response);
	}
});

//登录
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

//退出登录
app.get('/exit',(req, res) => { 
	// 清空session
	req.session.destroy();
	var response = JSON.stringify({code:0,msg:"退出成功"});
    res.send(response);
});

// 请求成功后对返回数据的处理
var jsonWrite = function(res, result) {
	var response = JSON.stringify({code:0,data: result});
	res.send(response);
};

module.exports = app;







