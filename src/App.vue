<template>
  <div id="app">
    <div class="wb-head">
      <el-row class="wb-head-nav">
        <el-col :span="8">
          <div class="wb-head-image">
            <img src="./assets/logo-topbar.gif"/>
          </div>
        </el-col>
        <el-col class="wb-head-bar" :span="9" :offset="7">
          <router-link to="/"><i class="el-icon-goods"></i> {{ $t("message.index") }}</router-link>
          <router-link to="/cart"><i class="el-icon-goods"></i> {{ $t("message.cart") }}</router-link>
          <router-link to="/order"><i class="el-icon-goods"></i> {{ $t("message.order") }}</router-link>
          <router-link to=""><i class="el-icon-refresh" @click="login">
            {{ user_status?$t("message.sign_out"):$t("message.sign_in") }}</i></router-link>
          <router-link to=""><i class="el-icon-refresh" @click="change_language">
            {{ language==='zh'?"English":"简体中文" }}</i></router-link>
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

    <el-dialog v-bind:title="$t('message.login_title')" :visible.sync="dialogFormVisible"
               v-loading="loading">
      <el-form :model="user_data">
        <el-form-item v-bind:label="$t('message.login_name')">
          <el-input v-model="user_data.username" type="text"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('message.login_passwd')">
          <el-input v-model="user_data.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t("message.cancel") }}</el-button>
        <el-button type="primary" @click="to_login">{{ $t("message.sure") }}</el-button>
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
        language: this.$i18n.locale,
        login_title: '',
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
      },
      change_language() {
        if (this.$i18n.locale === 'zh') {
          this.$i18n.locale = 'en'
        } else {
          this.$i18n.locale = 'zh'
        }
        this.language = this.$i18n.locale
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
