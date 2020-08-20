import http from './request.js'
let path = {	
	getIndexTop: "index/index",				//首页顶部信息
	getCategoryList:'category/list',		//分类列表
	addCategory:'category/add',				//添加分类
	editCategory:'category/edit',			//编辑分类
	delCategory:'category/del',				//删除分类
	getCategoryDetail:'category/getdetail',	//分类详情
	templateList:'template/list',			//模版列表
	addTemplate:'template/add',				//添加模版
	getTemplateDetail:'template/getdetail',	//模版详情
	editTemplate:'template/edit',			//修改模版
	infoList:'info/list',					//信息列表

	// state: "state",							//判断用户状态
	// login: "login",							//用户登录
	// exit: "exit",							//用户退出
	// addCategory:'addCategory',				//添加分类
	// getCategoryDetail:'getCategoryDetail',	//分类详情
	// updateCategory:'updateCategory',		//修改分类
	// deleteCategory:'deleteCategory',	    //删除分类
	// getTagList:'getTagList',				//获取三级标签
	// addTag:'addTag',						//添加三级标签
	// deleteTag:'deleteTag',					//删除三级标签
	// getTagDetail:'getTagDetail',			//查询三级标签
	// updateTag:'updateTag',					//修改三级标签
	// getTempList:'getTempList',				//查询模版列表
	// adminInfoList:'adminInfoList',			//获取信息列表
	// deleteInfo:'deleteInfo',				//删除信息
	// getUserList:'getUserList',				//获取用户列表
	// updateUserInfo:'updateUserInfo',		//修改用户状态

}
export default{
	//首页顶部信息
	getIndexTop(params){
		return http.get(path.getIndexTop, params)
	},
	//获取分类
	getCategoryList(params){
		return http.get(path.getCategoryList, params)
	},
	//添加分类
	addCategory(params){
		return http.post(path.addCategory, params)
	},
	//编辑分类
	editCategory(params){
		return http.post(path.editCategory, params)
	},
	//删除分类
	delCategory(params){
		return http.post(path.delCategory, params)
	},
	//分类详情
	getCategoryDetail(params){
		return http.get(path.getCategoryDetail, params)
	},
	//模版列表
	templateList(params){
		return http.get(path.templateList, params)
	},
	//添加模版
	addTemplate(params){
		return http.post(path.addTemplate, params)
	},
	//模版详情
	getTemplateDetail(params){
		return http.get(path.getTemplateDetail, params)
	},
	//修改模版
	editTemplate(params){
		return http.post(path.editTemplate, params)
	},
	//信息列表
	infoList(params){
		return http.get(path.infoList, params)
	},

	//判断用户状态
	// state(params){
	// 	return http.get(path.state, params)
	// },
	// //用户登录
	// login(params){
	// 	return http.post(path.login, params)
	// },
	// //用户退出
	// exit(params){
	// 	return http.get(path.exit, params)
	// },
	// //添加分类
	// addCategory(params){
	// 	return http.post(path.addCategory, params)
	// },
	// //删除分类
	// deleteCategory(params){
	// 	return http.post(path.deleteCategory, params)
	// },
	// //分类详情
	// getCategoryDetail(params){
	// 	return http.get(path.getCategoryDetail, params)
	// },
	// //修改分类
	// updateCategory(params){
	// 	return http.post(path.updateCategory, params)
	// },
	// //获取三级标签
	// getTagList(params){
	// 	return http.get(path.getTagList, params)
	// },
	// //添加三级标签
	// addTag(params){
	// 	return http.post(path.addTag, params)
	// },
	// //删除三级标签
	// deleteTag(params){
	// 	return http.post(path.deleteTag, params)
	// },
	// //查询三级标签
	// getTagDetail(params){
	// 	return http.get(path.getTagDetail, params)
	// },
	// //修改三级标签
	// updateTag(params){
	// 	return http.post(path.updateTag, params)
	// },
	// //查询模版列表
	// getTempList(params){
	// 	return http.get(path.getTempList, params)
	// },
	// //获取信息列表
	// adminInfoList(params){
	// 	return http.get(path.adminInfoList, params)
	// },
	// //删除信息
	// deleteInfo(params){
	// 	return http.post(path.deleteInfo, params)
	// },
	// //获取用户列表
	// getUserList(params){
	// 	return http.get(path.getUserList, params)
	// },
	// //修改用户状态
	// updateUserInfo(params){
	// 	return http.post(path.updateUserInfo, params)
	// },


}