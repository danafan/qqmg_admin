<template>
	<div>
		<el-card>
			<div class="top_buttons">
				<el-button type="primary" size="small" @click="add">添加</el-button>
			</div>
			<el-table :data="tag_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="sort_id" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="tag_name" label="标签名称" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row.tag_id)">编辑</el-button>
						<el-button type="text" size="small" @click="deleteItem(scope.row.tag_id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="showType == 1 ? '添加' : '编辑'" width="500px" :visible.sync="showDialog">
			<el-form size="small" :inline="true" class="demo-form-inline" label-width="150px">
				<el-form-item label="序号">
					<el-input v-model="req.sort_id" type="number"></el-input>
				</el-form-item>
				<el-form-item label="标签名称">
					<el-input v-model="req.tag_name"></el-input>
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

</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				tag_list:[],		//列表
				cate_id:"",			//上级id
				tag_id:null,		//选中的标签id
				showDialog:false,	//默认编辑弹框不显示
				req:{
					sort_id:"",
					tag_name:""
				},
				showType:1,			//1:添加；2:编辑
			}
		},
		created(){
			this.cate_id = this.$route.query.id;
			//获取列表
			this.getTagList({cate_id:this.cate_id});
		},
		methods:{
			//获取列表
			getTagList(req){
				resource.getTagList(req).then(res => {
					if(res.data.code == 0){
						this.tag_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//点击确认
			submit(){
				if(this.req.sort_id === ''){	
					this.$message.warning("请输入序号");
				}else if(this.req.tag_name == ''){
					this.$message.warning("请输入名称");
				}else{
					if(this.showType == 1){	//添加
						this.req.cate_id = this.cate_id;
						resource.addTag(this.req).then(res => {
							if(res.data.code == 0){
								this.$message.success(res.data.msg);
								//获取列表
								this.getTagList({cate_id:this.cate_id});
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{	//编辑 
						this.req.tag_id = this.tag_id;
						resource.updateTag(this.req).then(res => {
							if(res.data.code == 0){
								this.$message.success(res.data.msg);
								//获取列表
								this.getTagList({cate_id:this.cate_id});
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					this.showDialog = false;
				}
			},
			//添加一级分类
			add(){
				this.req = {
					sort_id:"",
					tag_name:""
				}
				this.showType = 1;
				this.showDialog = true;
			},	
			//编辑
			edit(id){
				this.tag_id = id;
				this.showType = 2;
				this.showDialog = true;
				resource.getTagDetail({tag_id:id}).then(res => {
					if(res.data.code == 0){
						this.req.sort_id = res.data.data[0].sort_id;
						this.req.tag_name = res.data.data[0].tag_name;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//删除
			deleteItem(id){
				this.$confirm('确认删除该标签?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.deleteTag({tag_id:id}).then(res => {
						if(res.data.code == 0){
							this.$message.success(res.data.msg);
							//获取列表
							this.getTagList({cate_id:this.cate_id});
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
		}
	}
</script>