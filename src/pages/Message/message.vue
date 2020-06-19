<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="发布时间：">
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
			<el-form-item label="发布人：">
				<el-input v-model="req.phone" type="number" placeholder="发布人手机号"></el-input>
			</el-form-item>
			<el-form-item label="信息类型：">
				<el-cascader
				clearable
				v-model="active_option"
				:options="options"
				@change="handleChange"></el-cascader>
			</el-form-item>
			<el-form-item label="浏览量：">
				<el-input v-model="req.browse" type="number" placeholder="请输入等级"></el-input>
			</el-form-item>
			<el-button type="primary" size="small" @click="search">搜索</el-button>
		</el-form>
		<el-table :data="dataObj.list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="shop_num" label="发布时间" align="center">
			</el-table-column>
			<el-table-column prop="cate_type" label="信息类型" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="发布人" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="描述" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="文件" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="浏览量" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="联系人" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="联系电话" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small">下架</el-button>
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
					push_start_time:"",
					push_end_time:"",
					phone:"",
					browse:""
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
						cate_type:"牲畜交易/牛",
						shop_num:"模拟数据"
					}
					],
					total:100
				},
				active_option: [],
				options: [{
					value: '1',
					label: '牲畜交易',
					children: [{
						value: '1',
						label: '牛'
					}, {
						value: '2',
						label: '羊'
					}]
				}, {
					value: '2',
					label: '农用物资',
					children: [{
						value: '1',
						label: '种子'
					}, {
						value: '2',
						label: '化肥'
					}, {
						value: '3',
						label: '农药'
					}]
				}]
			}
		},
		watch:{
			//注册时间
			date:function(n){
				this.req.push_start_time = n?n[0]:"";
				this.req.push_end_time = n?n[1]:"";
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
			//切换信息类型
			handleChange(value) {
				console.log(value);
			}
		}
	}
</script>



