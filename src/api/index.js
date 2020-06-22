import axios from 'axios'
const baseURL = `${location.origin}/admin/`;
// 创建axios实例，可以自定义配置
const instance = axios.create({
  baseURL,
});

instance.interceptors.response.use(function (response) {
  switch (response.data.code) {
    case 300:
    window.alert('用户未登陆');
  }
  return response;
},function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 404:
      window.alert('参数错误');
      break;
      case 500:
      window.alert('服务器故障');
      break;
      case 504:
      window.alert('没有网络');
      break;
    }
  }
});

export default instance;