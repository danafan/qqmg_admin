<template>
	<div>
		<el-card>
			<div class="top_buttons">
				<el-button type="primary" size="small" @click="add">添加</el-button>
			</div>
			<el-table :data="category_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="sort_id" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="temp_desc" label="模版名称" align="center">
				</el-table-column>
				<el-table-column prop="category_name" label="名称" align="center">
				</el-table-column>
				<el-table-column prop="category_name" label="标签" align="center">
					<template slot-scope="scope">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column prop="category_desc" label="描述" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row.category_id)">编辑</el-button>
						<el-button type="text" size="small" @click="deleteItem(scope.row.category_id)">删除</el-button>
						<!-- <el-button type="text" size="small" @click="getDetail(scope.row.category_id)">查看</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="showType == 1 ? '添加' : '编辑'" width="500px" :visible.sync="showDialog">
			<el-form size="small" :inline="true" class="demo-form-inline" label-width="150px">
				<el-form-item label="序号">
					<el-input v-model="req.sort_id" type="number"></el-input>
				</el-form-item>
				<el-form-item label="分类名称">
					<el-input v-model="req.category_name"></el-input>
				</el-form-item>
				<el-form-item label="分类描述">
					<el-input
					type="textarea"
					:rows="2"
					placeholder="分类描述"
					v-model="req.category_desc">
				</el-input>
			</el-form-item>
			<el-form-item label="分类标签">
				<el-select
				v-model="req.tag"
				multiple
				filterable
				allow-create
				default-first-option
				placeholder="标签内容">
			</el-select>
		</el-form-item>
		<el-form-item label="选择模版：">
			<el-select v-model="req.temp_id">
				<el-option v-for="item in template_list" :key="item.temp_id" :label="item.temp_desc" :value="item.temp_id">
				</el-option>
			</el-select>
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
				category_list:[],	//分类列表
				template_list:[],	//模版列表
				cate_id:"",			//当前选中的id
				p_id:null,			//上级分类
				showDialog:false,	//默认编辑弹框不显示
				req:{
					sort_id:"",
					category_name:"",
					tag:[],
					category_desc:"",
					temp_id:1
				},
				showType:1,			//1:添加；2:编辑
			}
		},
		created(){
			this.p_id = this.$route.query.id;
			//获取分类列表
			this.getCategoryList({p_id:this.p_id});
			//获取模版列表
			this.getTempList();
		},
		methods:{
			//获取模版列表
			getTempList(){
				resource.getTempList().then(res => {
					if(res.data.code == 0){
						this.template_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取分类列表
			getCategoryList(req){
				resource.getCategoryList(req).then(res => {
					if(res.data.code == 0){
						this.category_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//点击确认
			submit(){
				if(this.req.sort_id === ''){	
					this.$message.warning("请输入序号");
				}else if(this.req.category_name == ''){
					this.$message.warning("请输入分类名称");
				}else if(this.req.category_desc == ''){
					this.$message.warning("请输入分类描述");
				}else{
					if(this.showType == 1){	//添加
						this.req.p_id = this.p_id;
						resource.addCategory(this.req).then(res => {
							if(res.data.code == 0){
								this.$message.success(res.data.msg);
								//获取列表
								this.getCategoryList({p_id:this.p_id});
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{	//编辑 
						this.req.category_id = this.cate_id;
						this.req.p_id = this.p_id;
						resource.updateCategory(this.req).then(res => {
							if(res.data.code == 0){
								this.$message.success(res.data.msg);
								//获取列表
								this.getCategoryList({p_id:this.p_id});
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
					category_name:"",
					category_desc:"",
					temp_id:1
				}
				this.showType = 1;
				this.showDialog = true;
			},	
			//编辑
			edit(id){
				this.cate_id = id;
				resource.getCategoryDetail({category_id:id}).then(res => {
					if(res.data.code == 0){
						this.req = {
							sort_id:res.data.data[0].sort_id,
							category_name:res.data.data[0].category_name,
							category_desc:res.data.data[0].category_desc,
							temp_id:res.data.data[0].temp_id
						}
						this.showType = 2;
						this.showDialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//删除
			deleteItem(id){
				this.$confirm('确认删除该分类?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.deleteCategory({category_id:id}).then(res => {
						if(res.data.code == 0){
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
		}
	}
</script>