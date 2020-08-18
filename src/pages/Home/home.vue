<template>
	<div class="box">
		<el-container style="height:100%">
			<el-header class="header">
				<div class="gxk">青青芒果后台管理</div>
				<div class="headerRight">
					<div class="username">{{admin_name}}</div>
					<div class="line"></div>
					<div class="tui" @click="exit">退出</div>
				</div>
			</el-header>
			<el-container>
				<el-aside>
					<el-menu
					:default-active="activeIndex"
					:router="true"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#fff">
					<el-menu-item index="/index">
						<i class="el-icon-menu"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-menu-item index="/banner">
						<i class="el-icon-document"></i>
						<span slot="title">模版管理</span>
					</el-menu-item>
					<el-menu-item index="/category">
						<i class="el-icon-guide"></i>
						<span slot="title">分类标签</span>
					</el-menu-item>
					<el-menu-item index="/message">
						<i class="el-icon-document"></i>
						<span slot="title">信息管理</span>
					</el-menu-item>
					<el-menu-item index="/user">
						<i class="el-icon-user-solid"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</el-main>
		</el-container>
	</el-container>
</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.header{
		width: 100%;
		height: 64px;
		background:#00152A !important;
		display:flex;
		justify-content: space-between;
		align-items: center;
		.gxk{
			width: 256px;
			height: 64px;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 18px;
			color: #fff;
		}
		.headerRight{
			display:flex;
			align-items: center;
			.service{
				font-size: 14px;
				margin-right: 24px;
			}
			.username{
				font-size: 14px;
				color: #fff;
			}
			.line{
				margin-right: 8px;
				margin-left: 8px;
				border-right: 1px solid #FF8608;
				height:13px;
			}
			.tui{
				font-size: 14px;
				color: #fff;
			}
		}
	}
	.el-menu-item.is-active {
		background:#008DFF !important;
	}
	.el-submenu__title{
		color: #fff!important;
	}
	.el-aside{
		background:#00152A !important;
	}
	.el-menu{
		background:#00152A !important;
		border: none !important;
		
	}
	.main{
		background: #F0F2F5;
		height: 100%;
		overflow-y: scroll;
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				activeIndex:"/index",
				admin_name:""
			}
		},
		created(){
			this.admin_name = sessionStorage.getItem("username");
			let tab = sessionStorage.getItem("tab").indexOf('?') > -1 ? sessionStorage.getItem("tab").split("?")[0] : sessionStorage.getItem("tab");
			if(!tab){
				this.activeIndex = '/index';
			}else{
				if(tab == '/category' || tab == '/category_02' || tab == '/category_03'){
					this.activeIndex = '/category';
				}else{
					this.activeIndex = tab;
				}
			}
		},	
		watch:{
			$route(n){
				this.handleSelect(n.path);
			}
		},
		methods:{
			handleSelect(index){
				if(index == '/category' || index == '/category_02' || index == '/category_03'){
					this.activeIndex = '/category';
				}else{
					this.activeIndex = index;
				}
				
			},
			//点击退出
			exit(){
				this.$confirm('确认退出当前账户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.exit().then(res => {
						if(res.data.code == 0){
							sessionStorage.clear();
							this.$message.success(res.data.msg);
							this.$router.push('/login');
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});          
				});
			}
		}
	}
</script>




















