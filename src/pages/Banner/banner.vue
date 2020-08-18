<template>
	<div>
		<el-card>
			<div class="top_buttons">
				<el-button type="primary" size="small" @click="add">添加</el-button>
			</div>
			<el-table :data="temp_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="sort" label="模版ID" align="center">
				</el-table-column>
				<el-table-column prop="temp_name" label="模版名称" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit(temp_id)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="showType == 1 ? '添加' : '编辑'" :visible.sync="showDialog">
			<el-form size="small" :inline="true" class="demo-form-inline" label-width="150px">
				<el-form-item label="模版名称">
					<el-input v-model="req.temp_name" placeholder="请输入模版名称"></el-input>
				</el-form-item>
				<el-form-item label="模版内容">
					<div style="display: flex;align-items: center;margin-bottom: 20px" v-for="(item,index) in temp_content">
						<el-input v-model="item.item_name" placeholder="标签名称" style="width: 150px"></el-input>
						<el-select v-model="item.label_type" placeholder="标签类型">
							<el-option v-for="item in temp_dom_list" :key="item.label_type" :label="item.label_text" :value="item.label_type">
							</el-option>
						</el-select>
						<el-select
						v-model="item.item_value"
						multiple
						filterable
						allow-create
						default-first-option
						placeholder="标签内容">
					</el-select>
					<el-button style="margin-left: 20px" type="danger" icon="el-icon-delete" circle @click="deleteTempItem(index)" v-if="index < temp_content.length - 1"></el-button>
					<el-button style="margin-left: 20px" type="success" icon="el-icon-plus" circle @click="addTempItem(item)" v-if="index == temp_content.length - 1"></el-button>
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
	export default{
		data(){
			return{
				temp_list:[
				{
					sort:'1',
					name:"牲、农、二、汽"
				},
				{
					sort:'2',
					name:"招聘"
				},
				{
					sort:'3',
					name:"求职"
				},
				{
					sort:'4',
					name:"出售、出租"
				},
				{
					sort:'5',
					name:"基本（求租、求购、本地服务）"
				},
				{
					sort:'6',
					name:"打车拼车"
				},
				],
				temp_id:null,		//选中的分类
				showDialog:false,	//默认编辑弹框不显示
				req:{
					temp_name:"",
					temp_items:""
				},
				temp_content:[{
					item_name:"",
					label_type:"",
					item_value:[]
				}],	//模版内容数组
				temp_dom_list:[{
					label_text:'输入框',
					label_type:'1'
				},{
					label_text:'单选框',
					label_type:'2'
				},{
					label_text:'底部弹框',
					label_type:'3'
				},{
					label_text:'出发时间（底部弹框）',
					label_type:'4'
				}],
				showType:1,			//1:添加；2:编辑
			}
		},
		methods:{
			//添加
			add(){
				this.req = {
					temp_name:"",
					temp_items:""
				}
				this.temp_content = [{
					item_name:"",
					label_type:"",
					item_value:[]
				}];	//模版内容数组
				this.showType = 1;
				this.showDialog = true;
			},
			//编辑
			edit(id){
				console.log(id);
				this.showType = 2;
				this.showDialog = true;
			},
			//点击添加模版内容
			addTempItem(item){
				if(item.item_name == '' || item.label_type == '' || item.item_value.length == 0){
					this.$message.warning('请完善当前内容！')
				}else{
					let obj = {
						item_name:"",
						label_type:"",
						item_value:[]
					}
					this.temp_content.push(obj)//模版内容数组
				}
			},
			//点击删除模版内容
			deleteTempItem(index){
				this.temp_content.splice(index,1);
			},
			//确认提交	
			submit(){
				var arrReq = [];
				this.temp_content.map((item,index) => {
					if(index < this.temp_content.length - 1){
						arrReq.push(item);
					}
				});
				if(arrReq.temp_name == ''){
					this.$mesage.warning("请输入模版名称");
				}else if(arrReq.length == 0){
					this.$mesage.warning("请完善模版内容");
				}else{
					this.req.temp_items = JSON.stringify(arrReq);
					console.log(this.req)
				}
				
			}
		}
	}
</script>