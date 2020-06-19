<template>
	<div>
		<el-card>
			<el-collapse class="box_01" accordion>
				<el-button style="margin-top: 15px;" type="primary" size="small" icon="el-icon-plus">添加</el-button>
				<el-collapse-item v-for="(item,index) in options">
					<template slot="title">
						<div>{{item.label}}</div>
						<div class="buts">
							<el-button type="primary" size="small" icon="el-icon-edit" circle @click.stop="edit(item)"></el-button>
							<el-button type="primary" size="small" icon="el-icon-delete" circle @click.stop="deleteItem(item)"></el-button>
						</div>
					</template>
					<el-collapse class="box_02" accordion>
						<el-button style="margin-top: 15px;" type="danger" size="small" icon="el-icon-plus">添加</el-button>
						<el-collapse-item v-for="item_01 in item.children">
							<template slot="title">
								<div>{{item_01.label}}</div>
								<div class="buts">
									<el-button type="danger" size="small" icon="el-icon-edit" circle @click.stop="edit(item_01)"></el-button>
									<el-button type="danger" size="small" icon="el-icon-delete" circle @click.stop="deleteItem(item_01)"></el-button>
								</div>
							</template>
							<div class="box_03">
								<el-button style="margin-top: 15px;" type="warning" size="small" icon="el-icon-plus">添加</el-button>
								<div class="box_03_line" v-for="item_02 in item_01.children">
									<div>{{item_02.label}}</div>
									<div class="buts">
										<el-button type="warning" size="small" icon="el-icon-edit" circle @click.stop="edit(item_02)"></el-button>
										<el-button type="warning" size="small" icon="el-icon-delete" circle @click.stop="deleteItem(item_02)"></el-button>
									</div>
								</div>
							</div>
						</el-collapse-item>
					</el-collapse>
				</el-collapse-item>
			</el-collapse>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.box_01{
	width: 50%;
	.box_02{
		position: relative;
		left: 100px;
		width: 70%;
		.box_03{
			position: relative;
			left: 100px;
			width: 70%;
		}
	}
}
.buts{
	display: flex;
	margin-left: 30px;
}
.box_03_line{
	height: 50px;
	display: flex;
	align-items: center;
}
</style>
<script>
	export default{
		data(){
			return{
				options: [{
					value: '1',
					label: '牲畜交易',
					children: [{
						value: '1',
						label: '牛',
						children: [{
							value: '1',
							label: '牛-毛色亮'
						}, {
							value: '2',
							label: '牛-产奶多'
						}]
					}, {
						value: '2',
						label: '羊',
						children: [{
							value: '1',
							label: '羊-有角'
						}, {
							value: '2',
							label: '羊-得羔率高'
						}]
					}]
				}, {
					value: '2',
					label: '农用物资',
					children: [{
						value: '1',
						label: '种子',
						children: [{
							value: '1',
							label: '种子-饱满'
						}, {
							value: '2',
							label: '种子-圆润'
						}]
					}, {
						value: '2',
						label: '化肥',
						children: [{
							value: '1',
							label: '化肥-价格低'
						}, {
							value: '2',
							label: '化肥-抗倒伏'
						}]
					}]
				}]
			}
		},
		methods:{
			//编辑
			edit(item){
				console.log(item);
			},
			//删除
			deleteItem(item){
				console.log(item);
			}
		}
	}
</script>