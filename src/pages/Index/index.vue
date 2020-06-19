<template>
	<div>
		<el-card>
			<div class="top_box">
				<div class="top_item shadow_01">
					<img src="../../assets/yonghu.png">
					<div class="right_box">
						<div class="number">2372</div>
						<div class="label">用户总数</div>
					</div>
				</div>
				<div class="top_item shadow_02">
					<img src="../../assets/zhucewangzhan.png">
					<div class="right_box">
						<div class="number">88</div>
						<div class="label">今日注册</div>
					</div>
				</div>
				<div class="top_item shadow_03">
					<img src="../../assets/huoyue.png">
					<div class="right_box">
						<div class="number">106</div>
						<div class="label">今日活跃</div>
					</div>
				</div>
				<div class="top_item shadow_05">
					<img src="../../assets/info.png">
					<div class="right_box">
						<div class="number">16742</div>
						<div class="label">信息总数</div>
					</div>
				</div>
				<div class="top_item shadow_04">
					<img src="../../assets/push.png">
					<div class="right_box">
						<div class="number">1800</div>
						<div class="label">今日发布</div>
					</div>
				</div>
			</div>
		</el-card>
		<div class="center_content">
			<el-card style="margin-top: 10px;width: 49%">
				<div id="category_main" class="category_box"></div>
			</el-card>
			<el-card style="margin-top: 10px;width: 49%">
				<div id="china_main" class="china_main"></div>
			</el-card>
		</div>
		<el-card>
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
.center_content{
	margin-bottom: 10px;
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.category_box{
	width: 100%;
	height: 350px;
}
.china_main{
	width: 100%;
	height: 350px;
}
.axis_box{
	width: 100%;
	height: 350px;
}
</style>
<script>
	import echarts from "echarts";
	import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
	export default{
		data(){
			return{
				chinaData:[  
				{name: '北京',value: '100' },{name: '天津',value: Math.round(Math.random()*500) },  
				{name: '上海',value: Math.round(Math.random()*500) },{name: '重庆',value: Math.round(Math.random()*500) },  
				{name: '河北',value: Math.round(Math.random()*500) },{name: '河南',value: Math.round(Math.random()*500) },  
				{name: '云南',value: Math.round(Math.random()*500) },{name: '辽宁',value: Math.round(Math.random()*500) },  
				{name: '黑龙江',value: Math.round(Math.random()*500) },{name: '湖南',value: Math.round(Math.random()*500) }],	//中国地图数据
			}
		},
		mounted(){
			// 各类别发布数量
			this.categoryOption();
			//全国地图
			this.getChina();
			//折线图
			this.getAxis();
		},
		methods:{
			// 各类别发布数量
			categoryOption(){
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('category_main'));
				// 绘制图表
				myChart.setOption({
					title: {
						text: '各类别发布数量',
						x:'center'  
					},
					tooltip: {},
					xAxis: {
						data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '裤子', '高跟鞋']
					},
					yAxis: {},
					series: [{
						name: '数量',
						type: 'bar',
						itemStyle: {    // 图形的形状
							color: 'rgb(80,214,248)',
						},
						barWidth: 30,
						data: [5, 20, 36, 10, 10, 20, 10, 10]
					}]
				});
			},
			//活跃用户地区分布
			getChina(){
				var chinaCharts = echarts.init(document.getElementById('china_main'));
				chinaCharts.setOption({
					title: {  
						text: '活跃用户地区分布',  
						x:'center'  
					},  
					tooltip : {  
						trigger: 'item'  
					},  
                	//左侧小导航图标
                	visualMap: {  
                		show : false,  
                		x: 'left',  
                		y: 'center',  
                		splitList: [   
                		{start: 500, end:600},{start: 400, end: 500},  
                		{start: 300, end: 400},{start: 200, end: 300},  
                		{start: 100, end: 200},{start: 0, end: 100},  
                		],  
                		color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']  
                	},  
                	//配置属性
                	series: [{  
                		name: '数据',  
                		type: 'map',  
                		mapType: 'china',   
                		roam: true,  
                		label: {  
                			normal: {  
                            	show: true  //省份名称  
                            },  
                            emphasis: {  
                            	show: false  
                            }  
                        },  
                    	data:this.chinaData,  //数据
                    	nameMap: {
                    		'哈哈哈': '北京'
                    	}
                    }]  
                });
			},
			//折线图
			getAxis(){
				// 基于准备好的dom，初始化echarts实例
				var axisChart = echarts.init(document.getElementById('axis_box'));
				// 绘制图表
				axisChart.setOption({
					title: {
						text: '活跃用户和发布数量折线图'
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





