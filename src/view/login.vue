<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <!--  -->
    <div style="display: flex;justify-content: center;margin-top: 150px" >
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table align="center">

          <tr>
              <td colspan="2" v-if="bol" align="center" style="color:red">输入的账号或密码不正确</td>
          </tr>

          <tr>
            <td>用户名:</td>
            <td>
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码:</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button style="width: 350px" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
          
        </table>
      </el-card>
      <el-menu>
          <router-view></router-view>
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    //单页面中不支持前面的data:{}方式
    data() {
      //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
      return{
        //之前是在里面直接写username，password等等，但是这里要写return
        //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
        //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
        //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
        //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
        //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
        bol:false,
        messageInfo:[],
        user:{
          username:'',
          password:'',
          //为了登录方便，可以直接在这里写好用户名和密码的值
        }
      }
    },
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行
        var params = new URLSearchParams();
        params.append('username', this.user.username);       //你要传给后台的参数值 key/value
        params.append('password', this.user.password);
        this.$axios({
            method: 'post',
            url:'http://localhost:8080/users/loginUser',
            data: params
        }).then((res)=>{
          if(this.user.username==res.data.username&&this.user.password==res.data.password){
            this.bol=false
            this.messageInfo=res.data
            //to.meta.requireAuth==false
            localStorage.setItem("access_token", true);
            sessionStorage.setItem("loginusers",res.data.username)
            this.$router.push({name:'主页面'})
          }else{
            this.bol=true
            //alert("账号密码不对")
          }
        })    
      }
    }
  }
</script>
