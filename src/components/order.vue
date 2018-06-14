<template>
  <div>
    <h2></h2>
    <div>
      <el-table
        :data="data_list"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.list" stripe>
              <el-table-column prop="title" label="商品名"></el-table-column>
              <el-table-column prop="price" label="单价"></el-table-column>
              <el-table-column prop="num" label="数量"></el-table-column>
              <el-table-column label="小计">
                <template slot-scope="scope"> {{ show_calc(scope.row) }}</template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="订单序号" prop="lid"></el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope"> {{ show_title(scope.row) }}</template>
        </el-table-column>
        <el-table-column label="订单时间" prop="time"></el-table-column>
        <el-table-column label="总价值" prop="calc_sum">
          <template slot-scope="scope"> {{ show_sum(scope.row) }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import _global_ from "../Global";

  export default {
    name: "order",
    data() {
      return {
        data_list: [],
        uid: _global_.user_uid
      }
    },
    mounted() {
      let that = this;
      this.$http.get('http://127.0.0.1:5000/api/get_order/' + that.uid).then(function (res) {
        that.data_list = res.body
      }, function (res) {
        console.log('Fail ' + status + "," + request);
      });
    },
    methods: {
      show_title(row) {
        if (row.list.length > 1) {
          return '"' + row.list[0].title + "\"等" + row.list.length + "个商品"
        } else {
          return row.list[0].title;
        }
      },
      show_calc(row) {
        return row.num*row.price;
      },
      show_sum(row){
        let sum = 0;
        for(let item in row.list){
          sum += row.list[item].price*row.list[item].num;
        }
        return sum;
      }
    },
    computed: {
      calc_sum: function () {
        return 1;
      }
    }
  }
</script>

<style scoped>

</style>
