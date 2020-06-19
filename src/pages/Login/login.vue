<template>
	<div class="box">
		<div class="loginBack">
			<div class="item">
				<img class="icon" src="../../assets/username.png">
				<input type="text" placeholder="请输入用户名" v-model="username" @keyup.enter="login">
			</div>
			<div class="item">
				<img class="icon" src="../../assets/password.png">
				<input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
			</div>
		</div>
		<div class="login" @click="login">登录</div>
	</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #00152A;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.loginBack{
		padding-left:50px; 
		padding-right:50px; 
		border-radius: 10px;
		box-shadow: 0 0 15px 0px rgba(170, 170, 170, 1);
		width: 500px;
		height: 240px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.item{
			height: 70px;
			width: 100%;
			border-bottom: 1px solid #dcdcdc;
			display: flex;
			align-items: center;
			.icon{
				margin-right: 10px;
				width: 30px;
				height: 32px;
			}
			input{
				background: transparent;
				outline: none;
				border: none;
				font-size: 18px;
				flex:1;
				height: 60px;
				color: #333;
			}
			::-webkit-input-placeholder {  
				color: #ffffff; 
			} 
			:-moz-placeholder { 
				color: #ffffff; 
			} 
			::-moz-placeholder { 
				color: #ffffff; 
			} 
			:-ms-input-placeholder { 
				color: #ffffff; 
			} 
		}
	}
	.login{
		margin-top: 20px;
		border-radius: 25px;
		width: 200px;
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		color: #fff;
		background-color: rgba(56, 161, 243, 0.8);
	}
	.login:hover{
		background-color: rgba(56, 161, 243, 0.9);
	}
}
</style>
<script>
	// import resource from '../api/resource.js'
	export default{
		data(){
			return{
				username:"",			//用户名
				password: "",			//密码
			}
		},
		methods:{
			login(){
				if(this.username == ""){
					this.$message.warning("请输入用户名");
				}else if(this.password == ""){
					this.$message.warning("请输入密码");
				}else{
					let userObj = {
						username: this.username,
						password: this.password
					}
					// resource.login(userObj).then(res => {
					// 	if(res.data.code == "0"){
					// 		this.$message.success("登录成功");
					// 		//获取返回的用户信息传递到主页
					// 		let userObj = res.data.data[0];
					// 		sessionStorage.setItem("username",userObj.username);
					// 		this.$router.push('/index');
					// 	}else{
					// 		this.$message.error(res.data.msg);
					// 	};
					// });
				}
			}
		}
	}
</script>













