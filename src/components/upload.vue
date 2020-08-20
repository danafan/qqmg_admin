<template>
	<div>
		<div class="imgBox">
			<img class="upload_icon" src="../assets/upload_icon.png">
			<div class="upload_text">点击上传</div>
			<input type="file" ref="imgUpload" class="upload_file" @change="uploadFn">
		</div>
	</div>
</template>
<style lang="less" scoped>
.imgBox{
	border:1px solid #D9D9D9;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items:center;
	width: 100px;
	height: 100px;
	color: #666666;
	.upload_icon{
		width: 30px;
		height: 30px;
	}
	.upload_text{
		font-size: 12px;
		color:#333;
	}
	.upload_file {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
<script>
	export default{
		methods:{
			// 上传图片
			uploadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					var file = this.$refs.imgUpload.files[0];
					this.$emit('callbackFn',file);
				}
			}

		}


	}
</script>