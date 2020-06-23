import http from './request.js'
let path = {	
	state: "state",						//判断用户状态
	login: "login",						//用户登录
	exit: "exit",							//用户退出
	getCategoryList:'getCategoryList',		//获取一级二级分类
	addCategory:'addCategory',				//添加分类
	getCategoryDetail:'getCategoryDetail',	//分类详情
	updateCategory:'updateCategory',	//修改分类
	deleteCategory:'deleteCategory',				//删除分类
	getTagList:'getTagList',				//获取三级标签
	addTag:'addTag',						//添加三级标签
	deleteTag:'deleteTag',				//删除三级标签
	getTagDetail:'getTagDetail',						//查询三级标签
	updateTag:'updateTag',						//修改三级标签
	getTempList:'getTempList',				//查询模版列表

}
export default{
	//判断用户状态
	state(params){
		return http.get(path.state, params)
	},
	//用户登录
	login(params){
		return http.post(path.login, params)
	},
	//用户退出
	exit(params){
		return http.get(path.exit, params)
	},
	//获取一级二级分类
	getCategoryList(params){
		return http.get(path.getCategoryList, params)
	},
	//添加分类
	addCategory(params){
		return http.post(path.addCategory, params)
	},
	//删除分类
	deleteCategory(params){
		return http.post(path.deleteCategory, params)
	},
	//分类详情
	getCategoryDetail(params){
		return http.get(path.getCategoryDetail, params)
	},
	//修改分类
	updateCategory(params){
		return http.post(path.updateCategory, params)
	},
	//获取三级标签
	getTagList(params){
		return http.get(path.getTagList, params)
	},
	//添加三级标签
	addTag(params){
		return http.post(path.addTag, params)
	},
	//删除三级标签
	deleteTag(params){
		return http.post(path.deleteTag, params)
	},
	//查询三级标签
	getTagDetail(params){
		return http.get(path.getTagDetail, params)
	},
	//修改三级标签
	updateTag(params){
		return http.post(path.updateTag, params)
	},
	//查询模版列表
	getTempList(params){
		return http.get(path.getTempList, params)
	},


}