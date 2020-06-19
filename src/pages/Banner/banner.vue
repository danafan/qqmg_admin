<template>
	<div>
		<el-card>
			<el-table :data="banner_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column label="图片" align="center">
					<template slot-scope="scope">
						<img class="banner_img" :src="scope.row.img">
					</template>
				</el-table-column>
				<el-table-column prop="url" label="链接" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small">编辑</el-button>
						<el-button type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
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
				banner_list:[
					{
						img:require('../../assets/logo.png'),
						url:"asdhjsakdfgajhsdfgkasdf"
					},
					{
						img:require('../../assets/logo.png'),
						url:"asdhjsakdfgajhsdfgkasdf"
					},
					{
						img:require('../../assets/logo.png'),
						url:"asdhjsakdfgajhsdfgkasdf"
					}
				]
			}
		}
	}
</script>