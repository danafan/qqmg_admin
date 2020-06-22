<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import resource from './api/resource.js'
  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    created(){
      let tab = sessionStorage.getItem("tab");
          if(!tab || tab == '/'){
            this.$router.push('/index')
          }
      //判断用户状态
      // resource.state().then(res => {
      //   if(res.data.code == "0"){
      //     //如果登录过，直接从session获取用户信息，传递到主页
      //     let username = res.data.userObj.username;
      //     sessionStorage.setItem("username",username);
      //     let tab = sessionStorage.getItem("tab");
      //     if(!tab || tab == '/'){
      //       this.$router.push('/index')
      //     }
      //   }else{
      //     sessionStorage.removeItem("username");
      //     this.$router.push('/login');
      //   }
      // });
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }

  }
</script>
