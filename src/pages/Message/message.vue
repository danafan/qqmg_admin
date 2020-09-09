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
			<el-form-item label="发布人昵称：">
				<el-input v-model="req.nickname" placeholder="发布人昵称"></el-input>
			</el-form-item>
			<el-form-item label="用户编号：">
				<el-input v-model="req.user_id" placeholder="发布人昵称"></el-input>
			</el-form-item>
			<el-form-item label="一级分类：">
				<el-select v-model="req.cate1" @change="getCategoryList2">
					<el-option v-for="item in categoryList1" :key="item.cate_id" :label="item.cate_name" :value="item.cate_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="二级分类：">
				<el-select v-model="req.cate2">
					<el-option v-for="item in categoryList2" :key="item.cate_id" :label="item.cate_name" :value="item.cate_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="状态：">
				<el-select v-model="req.status">
					<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-button type="primary" size="small" @click="search">搜索</el-button>
		</el-form>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="180" prop="create_time" label="发布时间" align="center">
			</el-table-column>
			<el-table-column width="180" prop="nickname" label="发布人昵称" align="center">
			</el-table-column>
			<el-table-column width="180" prop="user_id" label="用户编号" align="center">
			</el-table-column>
			<el-table-column show-overflow-tooltip width="180" prop="address" label="发布地址" align="center">
			</el-table-column>
			<el-table-column width="180" prop="cate_name" label="所属分类" align="center">
			</el-table-column>
			<el-table-column show-overflow-tooltip width="200" prop="desc" label="描述" align="center">
			</el-table-column>
			<el-table-column width="200" prop="temp_content" label="模版信息" align="center">
			</el-table-column>
			<el-table-column width="120" label="文件" align="center">
				<template slot-scope="scope">
					<span class="null" v-if="scope.row.view_file.length == 0">暂无</span>
					<span class="look" v-else @click="look(scope.row.view_file,scope.row.view_type,scope.row.host)">查看</span>
				</template>
			</el-table-column>
			<el-table-column width="150" prop="linkman" label="联系人" align="center">
			</el-table-column>
			<el-table-column width="150" prop="link_phone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column width="150" prop="view_count" label="浏览量" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
					<el-button type="text" size="small" v-if="scope.row.status == 1" @click="deleteInfo(scope.row.info_id)">下架</el-button>
					<span class="null" v-if="scope.row.status == 0">已下架</span>
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
<!-- 查看文件弹框 -->
<div class="file_box" v-if="showBox" @click.stop="showBox = false">
	<div class="fileCon">
		<el-carousel class="fileCon" :loop="false" v-if="file_type == 1">
			<el-carousel-item class="fileCon" v-for="item in imgs" :key="item">
				<img class="fileCon" :src="item">
			</el-carousel-item>
		</el-carousel>
		<video v-else class="fileCon" :src="video" controls="controls"></video>
	</div>
</div>
</div>
</template>
<style lang="less" scoped>
.null{
	font-size: 12px;
	color: #dcdcdc;
}
.look{
	font-size: 12px;
	color: red;
}
.file_box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	.fileCon{
		width: 600px;
		height: 580px;
		background: #fff;
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					create_time_start:"",
					create_time_end:"",
					nickname:"",
					user_id:"",
					cate1:"",
					cate2:"",
					status:"1"
				},
				date:[],			//发布时间
				categoryList1:[],	//一级分类列表
				categoryList2:[],	//二级分类列表
				status_list:[{
					id:'1',
					name:'正常'
				},{
					id:'0',
					name:'已下架'
				}],
				dataObj:{},			//返回数据
				showBox:false,		//文件弹框不显示
				imgs:[],
				video:"",
				file_type:'image'
			}
		},
		created(){
			//获取列表
			this.getList(this.req);
			//获取一级分类
			this.getCategoryList();
		},
		watch:{
			//发布时间
			date:function(n){
				this.req.create_time_start = n && n.length > 0?n[0]:"";
				this.req.create_time_end = n && n.length > 0?n[1]:"";
			}
		},
		methods:{
			//获取信息列表
			getList(req){
				resource.infoList(req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取一级分类
			getCategoryList(){
				resource.getCategoryList().then(res => {
					if(res.data.code == 1){
						this.categoryList1 = res.data.data;
						this.categoryList1.unshift({cate_id:"",cate_name:"全部"})
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取二级分类
			getCategoryList2(cate_id){
				if(cate_id == ''){
					this.categoryList2 = [];
					this.req.cate2 = '';
				}else{
					resource.getCategoryList({cate_id:cate_id}).then(res => {
						if(res.data.code == 1){
							this.categoryList2 = res.data.data;
							if(this.categoryList2.length == 0){
								this.req.cate2 = '';
							}
							this.categoryList2.unshift({cate_id:"",cate_name:"全部"})
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
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
				this.getList(this.req);
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.getList(this.req);
			},
			//下架
			deleteInfo(id){
				this.$confirm('确认下架?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.shelvesInfo({info_id:id}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getList(this.req);
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
			//查看文件
			look(file_list,type,host){
				this.showBox = true;
				this.file_type = type;	//1:图片，2:视频
				if (this.file_type == 1){
					this.imgs = [];
					file_list.map(item => {
						let file_str = host + item;
						this.imgs.push(file_str);
					})
				}else{
					this.video = host + file_list[0];
				}
				
			}
		}
	}
</script>



