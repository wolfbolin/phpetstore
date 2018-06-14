<template>
  <div>
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
        <el-button type="success" size="small">支付</el-button>
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
        cartlist: _global_.cartlist
      }
    },
    methods:{
      to_back(){
        this.$router.back(-1);
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
