<template>
	<div>
		<el-card>
			<div class="top_box">
				<div class="top_item shadow_01">
					<img src="../../assets/yonghu.png">
					<div class="right_box">
						<div class="number">{{topInfo.user_total}}</div>
						<div class="label">用户总数</div>
					</div>
				</div>
				<div class="top_item shadow_02">
					<img src="../../assets/zhucewangzhan.png">
					<div class="right_box">
						<div class="number">{{topInfo.today_register}}</div>
						<div class="label">今日注册</div>
					</div>
				</div>
				<div class="top_item shadow_03">
					<img src="../../assets/huoyue.png">
					<div class="right_box">
						<div class="number">{{topInfo.user_active}}</div>
						<div class="label">今日活跃</div>
					</div>
				</div>
				<div class="top_item shadow_05">
					<img src="../../assets/info.png">
					<div class="right_box">
						<div class="number">{{topInfo.info_total}}</div>
						<div class="label">信息总数</div>
					</div>
				</div>
				<div class="top_item shadow_04">
					<img src="../../assets/push.png">
					<div class="right_box">
						<div class="number">{{topInfo.today_push}}</div>
						<div class="label">今日发布</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 30px">
			<div id="axis_box" class="axis_box"></div>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.top_box{
	display: flex;
	justify-content: space-around;
	.top_item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 18%;
		height: 130px;
		padding-left: 10px;
		padding-right: 10px;
		border-radius: 10px;
		img{
			width: 50px;
			height: 50px;
		}
		.right_box{
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			.number{
				font-size: 28px;
				font-weight: bold;
			}
			.label{
				font-size: 14px;
			}
		}
	}
	.shadow_01{
		box-shadow: 3px 3px 5px rgb(244,180,104);
		background-image: linear-gradient(rgb(237,121,49), rgb(244,180,104));
	}
	.shadow_02{
		box-shadow: 3rpx 3rpx 5rpx rgb(213,144,249);
		background-image: linear-gradient(rgb(176,72,246), rgb(213,144,249));
	}
	.shadow_03{
		box-shadow: 3rpx 3rpx 5rpx rgb(84,170,239);
		background-image: linear-gradient(rgb(43,131,245), rgb(84,170,239));
	}
	.shadow_04{
		box-shadow: 3px 3px 5px rgb(80,214,248);
		background-image: linear-gradient(rgb(53,155,246), rgb(80,214,248));
	}
	.shadow_05{
		box-shadow: 3px 3px 5px rgb(236,123,108);
		background-image: linear-gradient(rgb(232,82,114), rgb(236,123,108));
	}
}
.axis_box{
	width: 100%;
	height: 350px;
}
</style>
<script>
	import resource from '../../api/resource.js'
	import echarts from "echarts";
	export default{
		data(){
			return{
				topInfo:{},		//顶部信息
			}
		},
		mounted(){
			//折线图
			this.getAxis();
		},
		created(){
			//获取顶部数据
			this.getIndexTop();
		},
		methods:{
			//获取顶部数据
			getIndexTop(){
				resource.getIndexTop().then(res => {
					this.topInfo = res.data;
				})
			},
			//折线图
			getAxis(){
				// 基于准备好的dom，初始化echarts实例
				var axisChart = echarts.init(document.getElementById('axis_box'));
				// 绘制图表
				axisChart.setOption({
					title: {
						text: '注册、活跃和发布数量'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['活跃', '发布']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value'
					},
					series: [
					{
						name: '活跃',
						type: 'line',
						stack: '总量',
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '发布',
						type: 'line',
						stack: '总量',
						data: [220, 182, 191, 234, 290, 330, 310]
					}]
				})
			}
		}
	}
</script>





