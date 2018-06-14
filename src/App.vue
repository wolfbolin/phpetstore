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
          <router-link to="/order"><i class="el-icon-goods"></i> 订单</router-link>
          <router-link to=""><i class="el-icon-refresh" @click="login">{{ user_status?"注销":"登录" }}</i></router-link>
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
          <p class="me">CopyRight©2017 wolfbolin.com. All Rights Reserved.</p>
          <a href="http://www.miitbeian.gov.cn">湘ICP备17015330号</a>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="用户登录" :visible.sync="dialogFormVisible"
               v-loading="loading">
      <el-form :model="user_data">
        <el-form-item label="用户名">
          <el-input v-model="user_data.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user_data.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="to_login">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import _global_ from "./Global";

  export default {
    name: 'App',
    data() {
      return {
        dialogFormVisible: false,
        user_status: _global_.user_status,
        language: 'cn',
        loading: false,
        user_data: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        if (this.user_status) {
          this.user_status = false;
          _global_.user_status = false;
          this.$message({
            message: '登出成功',
            type: 'success'
          });
        } else {
          this.dialogFormVisible = true
        }
      },
      to_login() {
        this.loading = true;
        this.$http.post(
          'http://127.0.0.1:5000/api/login', {
            username: this.user_data.username,
            password: this.user_data.password
          }, {
            emulateJSON: true
          }).then(function (res) {
          if (res.body.result === 'success') {
            this.user_status = true;
            _global_.user_status = true;
            this.user_uid = res.body.uid;
            _global_.user_uid = res.body.uid;
            this.dialogFormVisible = false;
            this.$message({
              message: '登录成功，请开始愉快的购物体验',
              type: 'success'
            });
          } else {
            this.user_status = false;
            _global_.user_status = false;
            this.user_uid = res.body.uid;
            _global_.user_uid = res.body.uid;
            this.$message({
              message: '登录失败，请检查用户名与密码',
              type: 'warning'
            });
          }
        }, function (res) {
          this.$message({
            message: '网络连接异常，请稍后重试',
            type: 'warning'
          });
          console.log('fail' + status + "," + request);
        });
        this.loading = false;
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

  .wb-body {
    max-width: 1200px;
    margin: auto;
  }

  .wb-foot {
    background-color: #888888;
    padding: 24px 0;
  }

  .wb-foot-bar p, .wb-foot-bar a {
    display: block;
    text-align: center;
  }
</style>
