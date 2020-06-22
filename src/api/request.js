import axios from './index'
var qs = require('qs');
export default {
  post(path, params={}){
    return axios.post(`${path}`, qs.stringify(params),{headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }});
  },
  get(path, params={}){
    let target = {};
    Object.assign(params, target);
    let arr = [];
    let str = '';
    for(let a of Object.keys(params)){
      arr.push(a);
    }
    let arrSort = arr.sort();
    for(let b of arrSort){
      let val = params[b];
      str += `${b}=${val}&`;
    }
    if(!!str){
      return axios.get(`${path}?${str}`);
    }else{
      return axios.get(`${path}`);
    }
  },
  //上传图片专用
  img(path, params){
    return axios.post(`${path}`, params,{headers: {
      'Content-Type':'multipart/form-data'
    }});
  }

}
