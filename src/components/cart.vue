<template>
  <div>
    <h2>快来清空你的购物车吧</h2>
    <el-table
      ref="multipleTable"
      :data="cartlist" border
      @select="pick_pet"
      @select-all="pick_pet">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
        label="购买数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.num"
                           :min=1
                           @change="handleChange" label="描述文字">
          </el-input-number>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
                     v-on:click="to_animal(scope.row.pid)">查看
          </el-button>
          <el-button type="danger" size="small"
                     v-on:click="del_pet(scope.row.pid)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-card class="box-card">
      <el-button type="danger" size="small" v-on:click="clear_all">清空</el-button>
      <div class="wb-fr">
        <p class="money">总金额：￥{{ auto_sum }}</p>
        <el-button type="success" size="small"
                   v-on:click="to_pick">结算
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import _global_ from "../Global";

  export default {
    name: "cart",
    data() {
      return {
        cartlist: _global_.cartlist
      }
    },
    mounted() {
      console.log(this.cartlist)
      for (let index in this.cartlist) {
        this.$refs.multipleTable.toggleRowSelection(
          this.cartlist[index],
          this.cartlist[index].pick);
      }
    },
    methods: {
      handleChange(value) {
        for (let index in this.cartlist) {
          if (this.cartlist[index].num === undefined) {
            this.cartlist[index].num = 1;
          }
        }
      },
      pick_pet(picks) {
        for (let index in this.cartlist) {
          this.cartlist[index].pick = false
        }
        for (let item in picks) {
          picks[item].pick = true
        }
      },
      del_pet(pid) {
        this.$confirm('你确定不pick它了吗？是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let index in this.cartlist) {
            if (this.cartlist[index].pid === pid) {
              this.cartlist.splice(index, 1);
              break;
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      clear_all() {
        this.cartlist = [];
        _global_.cartlist = this.cartlist;
      },
      to_animal(pid) {
        this.$router.push({
          name: 'Animal',
          query: {
            pid: pid
          }
        })
      },
      to_pick() {
        if (_global_.user_status === true) {
          if(this.cartlist.length > 0){
            this.$router.push({
              name: 'Pick'
            })
          }else{
            this.$message({
              message: '快Pick你心爱的宠物吧',
              type: 'warning'
            });
          }

        } else {
          this.$message({
            message: '请您先登录帐号',
            type: 'warning'
          });
        }
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
