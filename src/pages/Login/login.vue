<template>
	<div class="box">
		<div class="loginBack">
			<div class="item">
				<img class="icon" src="../../assets/username.png">
				<input type="text" placeholder="请输入用户名" v-model="req.admin_name" @keyup.enter="login">
			</div>
			<div class="item">
				<img class="icon" src="../../assets/password.png">
				<input type="password" placeholder="请输入密码" v-model="req.admin_pwd" @keyup.enter="login">
			</div>
			<div class="item">
				<input class="captcha" v-model="req.captcha" placeholder="请输入验证码" @keyup.enter="login"></input>
				<img class="code_img" :src="codeUrl" @click="getCode">
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
				width: 24px;
				height: 26px;
			}
			input{
				background: transparent;
				outline: none;
				border: none;
				font-size: 18px;
				flex:1;
				height: 60px;
				color: #fff;
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
			.code_img{
				margin-left: 16px;
				width:158px;
				height:48px;
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
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					admin_name:"",			//用户名
					admin_pwd: "",			//密码
					captcha:"",				//验证码
				},
				codeUrl:"",
				i:0
			}
		},
		created(){
			this.codeUrl = this.captcha;
		},
		methods:{
			getCode(){
				this.i += 1;
				this.codeUrl = this.codeUrl + `?i=${this.i}`;	
			},
			login(){
				if(this.req.admin_name == ""){
					this.$message.warning("请输入用户名");
				}else if(this.req.admin_pwd == ""){
					this.$message.warning("请输入密码");
				}else if(this.req.captcha == ""){
					this.$message.warning("请输入验证码");
				}else{
					resource.login(this.req).then(res => {
						if(res.data.code == 1){
							this.$message.success("登录成功");
							//获取返回的用户信息传递到主页
							// let userObj = res.data.data[0];
							// sessionStorage.setItem("username",userObj.username);
							this.$router.push('/index');
						}else{
							this.$message.error(res.data.msg);
						};
					});
				}
			}
		}
	}
</script>













