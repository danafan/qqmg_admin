import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/Login/login'],resolve)
const home = resolve=>require(['@/pages/Home/home'],resolve)
const index = resolve=>require(['@/pages/Index/index'],resolve)
const banner = resolve=>require(['@/pages/Banner/banner'],resolve)
const category = resolve=>require(['@/pages/Category/category'],resolve)
const category_02 = resolve=>require(['@/pages/Category/category_02'],resolve)
const message = resolve=>require(['@/pages/Message/message'],resolve)
const user = resolve=>require(['@/pages/User/user'],resolve)

Vue.use(Router)

const router = new Router({
  routes: [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/home',
    component: home,
    children:[
    { path: '/index',name:"首页列表", component: index},
    { path: '/banner',name:"banner管理", component: banner},
    { path: '/category',name:"分类管理", component: category},
    { path: '/category_02',name:"二级分类", component: category_02},
    { path: '/message',name:"信息管理", component: message},
    { path: '/user',name:"用户管理", component: user}
    ]
  }
  ]
})
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let username = sessionStorage.getItem("username");
  let path = to.path;
  if(path != "/login"){
    if(!username){
      router.push('/login');
    }else{
      let path = to.fullPath;
      sessionStorage.setItem("tab",path);
    }
  }else{
    if(!!username){
      router.go(-1);
    }
  }
  next()
})
export default router;