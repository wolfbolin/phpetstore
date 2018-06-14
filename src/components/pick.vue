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
        loading:false
      }
    },
    methods:{
      to_back(){
        this.$router.back(-1);
      },
      pay(){
        this.loading = true;
        let that  = this;
        this.$message({
          type: 'success',
          message: '正在确认您的订单'
        });

        let pick_data = [];
        for(let item in this.cartlist){
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
            list:pick_data
          }, {
            emulateJSON: true
          }).then(function (res) {
          if (res.body.result === 'success') {
            let that = this;
            setTimeout(function (){
              that.$message({
                message: 'Pick成功，宠物会很快送到您的家中',
                type: 'success'
              });
              that.loading = false;
            }, 2000);
          } else {
            let that = this;
            setTimeout(function (){
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

  .box-card {
    margin: 30px 0;
  }
</style>
