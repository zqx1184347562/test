import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import main from '../view/main.vue'
import login from '../view/login'
import axios from 'axios'
import register from'../view/register'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/main',
      name:"主页面",
      meta:{
        requireAuth:true,
      },
      component:main,
    },
    {
      path:'/login',
      name:"登录",
      component:login
    },
    {
      path:'/register',
      name:"注册",
      component:register
    }
    
  ]
})

