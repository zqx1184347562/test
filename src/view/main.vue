
<template>

<div>
    <el-container>
      <el-header><span>当前登录:{{loginuser.username}}</span></el-header>
      <el-main>
          <el-table
          :data="tableData"
          style="width: 100%" >
          <el-table-column
            prop="username"
            label="用户"
            width="180">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    
    
</div>  
</template>

<script>
        
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          loginuser:{
            username:'fan',
          },
        }
      },
      created(){
          this.loginuser.username=sessionStorage.getItem("loginusers")      
          this.$axios({
            method: 'post',
            url:'http://localhost:8080/users/selectall',
          }).then((res)=>{
            this.tableData=res.data
          })
      }
    }

  </script>