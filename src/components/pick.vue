<template>
  <div v-loading="loading">
    <h2>快来清空你的购物车吧</h2>
    <el-table
      :data="cartlist" border>
      <el-table-column
        prop="pid"
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品单价">
      </el-table-column>
      <el-table-column
        prop="num"
        label="购买数量">
      </el-table-column>
      <el-table-column
        label="单项合计">
        <template slot-scope="scope">
          {{ scope.row.price * scope.row.num }}
        </template>
      </el-table-column>
    </el-table>

    <el-card class="box-card">
      <div class="wb-input-box">收货人员：
        <el-input v-model="user_name" class="wb-input"></el-input>
      </div>
      <div class="wb-input-box">收货电话：
        <el-input v-model="user_phone" class="wb-input"></el-input>
      </div>
      <div class="wb-input-box">收货地址：
        <el-cascader :options="options" v-model="user_area"></el-cascader>
        <el-input v-model="user_address" class="wb-input"></el-input>
      </div>
    </el-card>

    <el-card class="box-card">
      <el-button type="danger" size="small" v-on:click="to_back">后退</el-button>
      <div class="wb-fr">
        <p class="money">总金额：￥{{ auto_sum }}</p>
        <el-button type="success" size="small" @click="pay">支付</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import _global_ from "../Global";

  export default {
    name: "pick",
    data() {
      return {
        cartlist: _global_.cartlist,
        uid: _global_.user_uid,
        loading: false,
        user_name: '',
        user_phone: '',
        user_area: [],
        user_address: '',
        options: [{
          value: '110000',
          label: '北京',
          children: [{
            value: '110100',
            label: '直辖区',
            children: [{
              value: '110101',
              label: '东城区'
            }, {
              value: '110102',
              label: '西城区'
            }, {
              value: '110103',
              label: '朝阳区'
            }, {
              value: '110104',
              label: '丰台区'
            }]
          }]
        }, {
          value: '110200',
          label: '天津市',
          children: [{
            value: '110200',
            label: '直辖区',
            children: [{
              value: '110201',
              label: '和平区'
            }, {
              value: '110202',
              label: '河东区'
            }]
          }]
        }]
      }
    },
    mounted() {
      let that = this;
      this.$http.get('http://127.0.0.1:5000/api/get_user/' + that.uid).then(function (res) {
        that.user_name = res.body['user_name'];
        that.user_phone = res.body['user_phone'];
        that.user_area = res.body['user_area'];
        that.user_address = res.body['user_address'];
      }, function (res) {
        console.log('Fail ' + status + "," + request);
      });
    },
    methods: {
      to_back() {
        this.$router.back(-1);
      },
      pay() {
        this.loading = true;
        let that = this;
        this.$message({
          type: 'success',
          message: '正在确认您的订单'
        });

        this.$http.post(
          'http://127.0.0.1:5000/api/sure_user', {
            uid: that.uid,
            user_name: that.user_name,
            user_phone: that.user_phone,
            user_address: that.user_address,
            province: that.user_area[0],
            area: that.user_area[1],
            city: that.user_area[2],
          }, {
            emulateJSON: true
          }).then(function (res) {
          this.$message({
            type: 'success',
            message: '已确认个人信息，正在下单~'
          });
        }, function (res) {
          this.$message({
            message: '网络连接异常，请稍后重试',
            type: 'warning'
          });
          this.loading = false;
          console.log('fail' + status + "," + request);
        });

        let pick_data = [];
        for (let item in this.cartlist) {
          let it = {
            title: this.cartlist[item].title,
            price: this.cartlist[item].price,
            num: this.cartlist[item].num
          };
          //let it = this.cartlist[item].title;
          pick_data.push(JSON.stringify(it))
        }

        this.$http.post(
          'http://127.0.0.1:5000/api/pick_pet', {
            uid: _global_.user_uid,
            list: pick_data
          }, {
            emulateJSON: true
          }).then(function (res) {
          if (res.body.result === 'success') {
            let that = this;
            setTimeout(function () {
              that.$message({
                message: 'Pick成功，宠物会很快送到您的家中',
                type: 'success'
              });
            }, 2000);
          } else {
            let that = this;
            setTimeout(function () {
              that.$message({
                message: 'Pick失败，请你是不是哪里出错了',
                type: 'warning'
              });
              that.loading = false;
            }, 2000);
          }
        }, function (res) {
          this.$message({
            message: '网络连接异常，请稍后重试',
            type: 'warning'
          });
          this.loading = false;
          console.log('fail' + status + "," + request);
        });

        setTimeout(function () {
          that.loading = false;
          that.$router.push({name: 'Order'})
        }, 1000);
      }
    },
    computed: {
      auto_sum: function () {
        let sum = 0;
        for (let index in this.cartlist) {
          if (this.cartlist[index].pick) {
            sum += this.cartlist[index].num * this.cartlist[index].price;
          }
        }
        return sum;
      }
    }
  }
</script>

<style scoped>
  .money {
    color: red;
    font-size: 20px;
    display: inline;
    vertical-align: middle;
    margin-right: 30px;
  }

  .wb-fr {
    float: right;
  }

  .wb-fr div {
    display: inline;
  }

  .wb-input-box {
    margin: 20px 0;
  }

  .wb-input {
    width: 240px;
  }

  .box-card {
    margin: 30px 0;
  }
</style>
