import http from './request.js'
let path = {	
	// login:"admin/login",									//登录

}				
export default{
	//登录
	login(params){
		return http.post(path.login, params)
	}
}









