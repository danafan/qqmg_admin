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
				<el-input v-model="req.create_user_nickname" placeholder="发布人昵称"></el-input>
			</el-form-item>
			<el-form-item label="浏览量：">
				<el-input v-model="req.browse" type="number" placeholder="请输入浏览量"></el-input>
			</el-form-item>
			<el-button type="primary" size="small" @click="search">搜索</el-button>
		</el-form>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column label="发布时间" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.create_time|formateDate}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="create_user_nickname" label="发布人" align="center">
			</el-table-column>
			<el-table-column prop="category_name" label="分类名称" align="center">
			</el-table-column>
			<el-table-column prop="info_desc" label="描述" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="文件" align="center">
				<template slot-scope="scope">
					<span class="null" v-if="!scope.row.file_list">暂无</span>
					<span class="look" v-else @click="look(scope.row.file_list)">查看</span>
				</template>
			</el-table-column>
			<el-table-column prop="browse_num" label="浏览量" align="center">
			</el-table-column>
			<el-table-column prop="contact" label="联系人" align="center">
			</el-table-column>
			<el-table-column prop="contact_phone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="deleteInfo(scope.row.info_id,scope.row.file_list)">下架</el-button>
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
		<el-carousel class="fileCon" v-if="file_type == 'image'">
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
					push_start_time:"",
					push_end_time:"",
					create_user_nickname:"",
					browse:"",
					level_01_id:"",
					level_02_id:""
				},
				date:[],		//发布时间
				dataObj:{},		//返回数据
				showBox:false,	//文件弹框不显示
				imgs:[],
				video:"",
				file_type:'image'
			}
		},
		created(){
			//获取列表
			this.getList(this.req);
		},
		watch:{
			//注册时间
			date:function(n){
				this.req.push_start_time = n?n[0]:"";
				this.req.push_end_time = n?n[1]:"";
			}
		},
		methods:{
			//获取信息列表
			getList(req){
				resource.adminInfoList(req).then(res => {
					this.dataObj = res.data;
				})
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
			//删除信息
			deleteInfo(id,file_list){
				this.$confirm('确认下架?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.deleteInfo({info_id:id,filelist:file_list}).then(res => {
						if(res.data.code == 0){
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
			look(file_list){
				if (file_list && file_list.indexOf('mp4') > -1){
					this.showBox = true;
					this.file_type = 'video';
					this.video = this.baseUrl + file_list;
				}else{
					this.file_type = 'image';
					this.showBox = true;
					this.imgs = [];
					file_list.split("_").map(item => {
						this.imgs.push(this.baseUrl + item);
					})
				}
				
			}
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



