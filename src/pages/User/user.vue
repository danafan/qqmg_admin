<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="手机号：">
					<el-input v-model="req.phone" type="number" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="等级：">
					<el-input v-model="req.level" type="number" placeholder="请输入等级"></el-input>
				</el-form-item>
				<el-form-item label="发布总数：">
					<el-input v-model="req.push_total" type="number" placeholder="请输入发布总数"></el-input>
				</el-form-item>
				<el-form-item label="注册地址：">
					<el-input v-model="req.address" type="number" placeholder="注册地址"></el-input>
				</el-form-item>
				<el-form-item label="用户状态：">
					<el-select v-model="req.user_status">
						<el-option v-for="item in user_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
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
			<el-button type="primary" size="small" @click="search">搜索</el-button>
		</el-form>
		<el-table :data="dataObj.list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="shop_num" label="注册时间" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="头像" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="昵称" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="手机号" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="注册地址" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="发布总数" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="等级" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="状态" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small">启用</el-button>
					<el-button type="text" size="small">禁用</el-button>
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
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					phone:"",
					level:"",
					push_total:"",
					address:"",
					user_status:"1",
					res_start_time:"",
					res_end_time:""
				},
				user_status_list:[
				{
					id:"1",
					name:"正常"
				},
				{
					id:"2",
					name:"禁用"
				}
				],
				date:[],		//注册时间
				dataObj:{
					list:[
						{
							shop_num:"模拟数据"
						}
					],
					total:100
				}
			}
		},
		watch:{
			//注册时间
			date:function(n){
				this.req.res_start_time = n?n[0]:"";
				this.req.res_end_time = n?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){

			},
			//搜索
			search(){

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
		}
	}
</script>



