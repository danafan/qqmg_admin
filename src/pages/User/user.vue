<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="注册时间：">
					<el-date-picker
					v-model="date"
					type="datetimerange"
					value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="用户编号：">
				<el-input v-model="req.user_id" type="number" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="手机号：">
				<el-input v-model="req.phone" type="number" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="用户状态：">
				<el-select v-model="req.user_status">
					<el-option v-for="item in user_status_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-button type="primary" size="small" @click="search">搜索</el-button>
		</el-form>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="create_time" label="注册时间" align="center">
			</el-table-column>
			<el-table-column prop="create_addr" label="注册地址" align="center">
			</el-table-column>
			<el-table-column prop="user_id" label="用户编号" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="手机号" align="center">
			</el-table-column>
			<el-table-column prop="active_days" label="活跃天数" align="center">
			</el-table-column>
			<el-table-column prop="publish_num" label="发布数量" align="center">
			</el-table-column>
			<el-table-column label="状态" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.status == 1">正常</span>
					<span v-if="scope.row.status == 0">已禁用</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="setting(scope.row.user_id)">{{scope.row.status == 1?'禁用':'启用'}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="req.page"
			:pager-count="11"
			:page-sizes="[5, 10, 15, 20]"
			layout="total, sizes, prev, pager, next, jumper"
			:total="dataObj.total"
			>
		</el-pagination>
	</div>
</el-card>
</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					user_status:"1",
					create_time_start:"",
					create_time_end:"",
					user_id:"",
					phone:"",

				},
				user_status_list:[
				{
					id:"1",
					name:"正常"
				},
				{
					id:"0",
					name:"已禁用"
				}
				],
				date:[],		//注册时间
				dataObj:{},
			}
		},
		watch:{
			//注册时间
			date:function(n){
				this.req.create_time_start = n && n.length > 0?n[0]:"";
				this.req.create_time_end = n && n.length > 0?n[1]:"";
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		methods:{
			//获取列表
			getList(){
				resource.userList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//设置
			setting(user_id){
				this.$confirm('确认修改?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.setStatus({user_id:user_id}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//搜索
			search(){
				this.req.page = 1;
				this.req.pagesize = 10;
				//获取列表
				this.getList(this.req);
			},
			//分页
			handleSizeChange(val) {
				this.req.pagesize = val;
				//获取列表
				this.getList();
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.getList();
			},
		},
		filters:{
			formateDate:function(datetime) {
				function addDateZero(num) {
					return (num < 10 ? "0" + num : num);
				}
				let d = new Date(datetime);
				let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
				return formatdatetime;
			}
		}
	}
</script>



