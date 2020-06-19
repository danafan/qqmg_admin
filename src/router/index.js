import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/Login/login'],resolve)
const home = resolve=>require(['@/pages/Home/home'],resolve)
const index = resolve=>require(['@/pages/Index/index'],resolve)
const banner = resolve=>require(['@/pages/Banner/banner'],resolve)
const category = resolve=>require(['@/pages/Category/category'],resolve)
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
    { path: '/message',name:"信息管理", component: message},
    { path: '/user',name:"用户管理", component: user}
    ]
  }
  ]
})
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let path = to.fullPath;
  sessionStorage.setItem("tab",path);
  next()
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;