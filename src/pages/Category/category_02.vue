<template>
	<div>
		<el-card>
			<div class="top_buttons">
				<el-button type="primary" size="small" @click="add">添加</el-button>
			</div>
			<el-table :data="category_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column width="150" prop="sort" label="分类序号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="cate_name" label="分类名称" align="center">
				</el-table-column>
				<el-table-column width="200" prop="temp_name" label="所属模版" align="center">
				</el-table-column>
				<el-table-column prop="tags" label="标签" align="center">
				</el-table-column>
				<el-table-column show-overflow-tooltip prop="default_desc" label="描述" align="center">
				</el-table-column>
				<el-table-column width="150" label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row.cate_id)">编辑</el-button>
						<el-button type="text" size="small" @click="deleteItem(scope.row.cate_id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="showType == 1 ? '添加' : '编辑'" width="500px" :visible.sync="showDialog">
			<el-form size="small" :inline="true" class="demo-form-inline" label-width="150px">
				<el-form-item label="分类序号">
					<el-input v-model="req.sort"></el-input>
				</el-form-item>
				<el-form-item label="分类名称">
					<el-input v-model="req.cate_name"></el-input>
				</el-form-item>
				<el-form-item label="分类描述">
					<el-input
					type="textarea"
					:rows="2"
					placeholder="分类描述"
					v-model="req.default_desc">
				</el-input>
			</el-form-item>
			<el-form-item label="分类标签">
				<el-select
				v-model="tag"
				multiple
				filterable
				allow-create
				default-first-option
				placeholder="标签内容">
			</el-select>
		</el-form-item>
		<el-form-item label="选择模版：">
			<el-select v-model="req.temp_id" placeholder="请选择模版">
				<el-option v-for="item in template_list" :key="item.temp_id" :label="item.temp_name" :value="item.temp_id">
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
				pcid:"",			//父级ID
				showDialog:false,	//默认弹框不显示
				req:{
					level:2,
					sort:0,
					cate_name:"",
					default_desc:"",
					temp_id:""
				},
				tag:[],				//添加的标签列表
				showType:1,			//1:添加；2:编辑
			}
		},
		created(){
			this.pcid = this.$route.query.id;
			//获取分类列表
			this.getCategoryList();
			//获取模版列表
			this.templateList();
		},
		methods:{
			//获取分类列表
			getCategoryList(){
				resource.getCategoryList({cate_id:this.pcid,level:2}).then(res => {
					if(res.data.code == 1){
						this.category_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//模版列表
			templateList(){
				resource.templateList().then(res => {
					if(res.data.code == 1){
						this.template_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//添加分类
			add(){
				this.req = {
					level:2,
					sort:0,
					cate_name:"",
					default_desc:"",
					temp_id:""
				}
				this.tag = [];
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
						this.tag = res.data.data.tags.split(',');
						this.showType = 2;
						this.showDialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击确认
			submit(){
				if(this.req.sort === ''){	
					this.$message.warning("请输入序号");
				}else if(this.req.cate_name == ''){
					this.$message.warning("请输入分类名称");
				}else if(this.req.default_desc == ''){
					this.$message.warning("请输入分类描述");
				}else if(this.tag.length == 0){
					this.$message.warning("请添加分类标签");
				}else if(this.req.temp_id == ''){
					this.$message.warning("请选择模版");
				}else{
					if(this.showType == 1){	//添加
						this.req.tags = this.tag.join(',');
						this.req.pcid = this.pcid;
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
						this.req.tags = this.tag.join(',');
						this.req.pcid = this.pcid;
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
							this.getCategoryList();
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