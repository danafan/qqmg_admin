<template>
	<div>
		<el-card>
			<div class="top_buttons">
				<el-button type="primary" size="small" @click="add">添加</el-button>
			</div>
			<el-table :data="temp_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="temp_name" label="模版名称" align="center">
				</el-table-column>
				<el-table-column prop="temp_items" label="模版选项">
					<template slot-scope="scope">
						<div style="margin-bottom: 10px" v-for="item in JSON.parse(scope.row.temp_items)">
							<span style="color: red">{{item.item_name}}</span>
							 - {{item.label_type | tagType(temp_dom_list)}} - {{JSON.stringify(item.item_value)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(scope.row.temp_id)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="showType == 1 ? '添加' : '编辑'" :visible.sync="showDialog">
			<el-form size="small" label-width="150px">
				<el-form-item label="模版名称">
					<el-input v-model="req.temp_name" placeholder="请输入模版名称"></el-input>
				</el-form-item>
				<el-form-item label="模版选项">
					<div style="margin-right: 20px;margin-bottom: 10px" v-for="(item,index) in temp_content">
						<el-tag closable type="success" effect="dark" @close="deleteTempItem(index)">{{item.item_name}} - {{item.label_type | tagType(temp_dom_list)}} - {{item.item_value}}</el-tag>
					</div>
					<div style="display: flex;align-items: center;margin-bottom: 20px">
						<el-input v-model="temp_content_item.item_name" placeholder="选项名称" style="width: 150px"></el-input>
						<el-select v-model="temp_content_item.label_type" placeholder="标签类型">
							<el-option v-for="item in temp_dom_list" :key="item.label_type" :label="item.label_text" :value="item.label_type">
							</el-option>
						</el-select>
						<el-select
						v-if="temp_content_item.label_type == 2 || temp_content_item.label_type == 3"
						v-model="temp_content_item.item_value"
						multiple
						filterable
						allow-create
						default-first-option
						placeholder="标签内容">
					</el-select>
					<el-button style="margin-left: 20px" type="success" icon="el-icon-plus" circle @click="addOptions"></el-button>
				</div>
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
.banner_img{
	width: 280px;
	height: 80px;
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				temp_list:[],
				temp_id:null,		//选中的模版id
				showDialog:false,	//默认编辑弹框不显示
				req:{
					temp_name:"",
					temp_items:""
				},
				temp_content:[],	//模版内容数组
				temp_content_item:{
					item_name:"",
					label_type:"",
					item_value:[]
				},
				temp_dom_list:[{
					label_text:'输入框',
					label_type:1
				},{
					label_text:'单选框',
					label_type:2
				},{
					label_text:'底部弹框',
					label_type:3
				},{
					label_text:'出发时间（底部弹框）',
					label_type:4
				}],
				showType:1,			//1:添加；2:编辑
			}
		},
		created(){
			//模版列表
			this.templateList();
		},
		methods:{
			//模版列表
			templateList(){
				resource.templateList().then(res => {
					if(res.data.code == 1){
						this.temp_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//添加
			add(){
				this.req = {
					temp_name:"",
					temp_items:""
				}
				this.temp_content = [],
				this.showType = 1;
				this.showDialog = true;
			},
			//编辑
			edit(id){
				resource.getTemplateDetail({temp_id:id}).then(res => {
					if(res.data.code == 1){
						this.showType = 2;
						this.showDialog = true;
						this.req = res.data.data;
						this.temp_content = JSON.parse(res.data.data.temp_items)
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//添加选项
			addOptions(){
				if(this.temp_content_item.item_name == ''){
					this.$message.warning('请输入选项名称！')
				}else if(this.temp_content_item.label_type == ''){
					this.$message.warning('请选择标签类型！')
				}else if((this.temp_content_item.label_type == 2 || this.temp_content_item.label_type == 3) && this.temp_content_item.item_value.length == 0){
					this.$message.warning('请添加标签内容！')
				}else{
					this.temp_content.push(this.temp_content_item)//模版内容数组
					this.temp_content_item = {
						item_name:"",
						label_type:"",
						item_value:[]
					}
				}
			},
			//删除选项
			deleteTempItem(index){
				this.temp_content.splice(index,1);
			},
			//确认提交	
			submit(){
				if(this.req.temp_name == ''){
					this.$message.warning("请输入模版名称");
				}else{
					this.req.temp_items = JSON.stringify(this.temp_content);
					if(this.showType == 1){	
						resource.addTemplate(this.req).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.showDialog = false;
								//模版列表
								this.templateList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{				
						resource.editTemplate(this.req).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.showDialog = false;
								//模版列表
								this.templateList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}
			}
		},
		filters:{
			tagType:function(v,temp_dom_list){
				var str = "";
				temp_dom_list.map(item => {
					if(item.label_type == v){
						str = item.label_text;
					}
				})
				return str;
			}
		}
	}
</script>