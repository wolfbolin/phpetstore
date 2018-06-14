<template>
  <div id="app">
    <div class="wb-head">
      <el-row class="wb-head-nav">
        <el-col :span="8">
          <div class="wb-head-image">
            <img src="./assets/logo-topbar.gif"/>
          </div>
        </el-col>
        <el-col class="wb-head-bar" :span="8" :offset="8">
          <router-link to="/"><i class="el-icon-goods"></i> 主页</router-link>
          <router-link to="/cart"><i class="el-icon-goods"></i> 购物车</router-link>
          <a><i class="el-icon-refresh"></i> {{ user_status?"注销":"登录" }}</a>
          <a><i class="el-icon-refresh"></i> {{ language==='cn'?"English":"简体中文" }}</a>
        </el-col>
      </el-row>
    </div>

    <div class="wb-body">
      <router-view/>
    </div>

    <div class="wb-foot">
      <el-row>
        <el-col class="wb-foot-bar" :span="12" :offset="6">
          <p class="me">CopyRight©2017  wolfbolin.com. All Rights Reserved.</p>
          <a href="http://www.miitbeian.gov.cn">湘ICP备17015330号</a>
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        user_status: true,
        language: 'cn'
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .wb-head {
    background: black;
  }

  .wb-head-nav {
    max-width: 1000px;
    margin: auto;
  }

  .wb-head-bar {
    line-height: 60px;
  }

  .wb-head-bar a {
    display: inline-block;
    color: sandybrown;
    vertical-align: middle;
  }

  .wb-body{
    max-width: 1200px;
    margin: auto;
  }


  .wb-foot{
    background-color: #888888;
    padding: 24px 0;
  }
  .wb-foot-bar p,.wb-foot-bar a{
    display: block;
    text-align: center;
  }
</style>
