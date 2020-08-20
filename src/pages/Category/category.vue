<template>
	<div>
		<el-card>
			<div class="top_buttons">
				<el-button type="primary" size="small" @click="add">添加</el-button>
			</div>
			<el-table :data="category_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="sort" label="序号" align="center">
				</el-table-column>
				<el-table-column label="图标" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.icon" class="showimg">
					</template>
				</el-table-column>
				<el-table-column prop="cate_name" label="名称" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row.cate_id)">编辑</el-button>
						<el-button type="text" size="small" @click="deleteItem(scope.row.cate_id)">删除</el-button>
						<el-button type="text" size="small" @click="getDetail(scope.row.cate_id)">查看子分类</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="showType == 1 ? '添加' : '编辑'" width="500px" :visible.sync="showDialog">
			<el-form size="small" :inline="true" class="demo-form-inline" label-width="150px">
				<el-form-item label="序号">
					<el-input v-model="req.sort" type="number" placeholder="手机端显示的顺序"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="req.cate_name" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="图标">
					<div class="showimg" v-if="showIcon != ''" @mouseenter="isDel = true" @mouseleave="isDel = false">
						<img class="img" :src="showIcon"/>
						<div class="modal" v-if="isDel == true">
							<img src="../../assets/deleteImg.png" @click="deteleImg">
						</div>
					</div>
					<upload-file @callbackFn="callbackFn" v-else></upload-file>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showDialog = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang="less" scoped>
.showimg{
	position: relative;
	width: 100px;
	height: 100px;
	.img{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.modal{
		background: rgba(0,0,0,.6);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		img{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			display:block;
			width: 30px;
			height: 30px;
		}
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	import uploadFile from '../../components/upload.vue'
	export default{
		data(){
			return{
				category_list:[],	//列表
				cate_id:'',			//选中的分类
				showDialog:false,	//默认编辑弹框不显示
				req:{
					level:1,
					sort:0,
					cate_name:"",
					icon:null,
				},
				showIcon:"",
				showType:1,			//1:添加；2:编辑
				isDel:false
			}
		},
		created(){
			//获取分类列表
			this.getCategoryList();
		},
		methods:{
			//获取分类列表
			getCategoryList(){
				resource.getCategoryList().then(res => {
					if(res.data.code == 1){
						this.category_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//添加分类
			add(){
				this.req = {
					level:1,
					sort:0,
					cate_name:"",
					icon:null,
				}
				this.showIcon = "";
				this.showType = 1;
				this.showDialog = true;
			},	
			//编辑
			edit(id){
				this.cate_id = id;
				resource.getCategoryDetail({cate_id:id}).then(res => {
					if(res.data.code == 1){
						for(let k in this.req){
							for(let kk in res.data.data){
								if(k == kk){
									this.req[k] = res.data.data[kk]
								}
							}
						}
						this.showIcon = res.data.data.icon;
						this.showType = 2;
						this.showDialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//上传文件
			callbackFn(file){
				this.req.icon = file;				//传递到后台的银行卡图片对象
				let fr = new FileReader();
				let _this = this;
				fr.onload = function(){
					_this.showIcon = this.result;//预览的银行卡图片地址
				};
				fr.readAsDataURL(file);
			},
			//删除文件
			deteleImg(){
				this.req.icon = null;
				this.showIcon = "";
			},
			//确认
			submit(){
				if(this.req.sort === ''){	
					this.$message.warning("请输入序号");
				}else if(this.req.cate_name == ''){
					this.$message.warning("请输入分类名称");
				}else if(!this.req.icon){
					this.$message.warning("请上传分类图标");
				}else{
					if(this.showType == 1){	//添加
						resource.addCategory(this.req).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getCategoryList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{	//编辑 
						this.req.cate_id = this.cate_id;
						resource.editCategory(this.req).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getCategoryList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					this.showDialog = false;
				}
			},
			//查看子分类
			getDetail(id){
				this.$router.push('/category_02?id=' + id);
			},
			//删除
			deleteItem(id){
				this.$confirm('确认删除该分类?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.delCategory({cate_id:id}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getCategoryList({p_id:0});
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
			}
		},
		components:{
			uploadFile
		}
	}
</script>