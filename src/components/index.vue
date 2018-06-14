<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs=24 :sm=14 class="wb-body-image-box hidden-xs-only">
        <img class="wb-body-image" src="../assets/splash.gif"/>
      </el-col>
      <el-col :xs=24 :sm=10>
        <h2>Welcome come to phpetstore</h2>
        <el-card class="wb-body-list-box">
          <el-collapse accordion>
            <el-collapse-item v-for="item in goods_class">
              <template slot="title">
                <i class="header-icon el-icon-info"></i>{{ item.species }}
              </template>
              <el-table :data="item.variety" :show-header="false"  @row-click="to_select">
                <el-table-column prop="name">
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        goods_class: []
      }
    },
    mounted(){
      this.get_class()
    },
    methods:{
      get_class(){
        let that = this;
        this.$http.get('http://127.0.0.1:5000/api/get_class').then(function (res) {
          that.goods_class = res.body
        }, function (res) {
          console.log('fail' + status + "," + request);
        });
      },
      to_select(row){
        this.$router.push({
          name: 'Select',
          query: {
            cid: row.cid
          }
        })
      }
    }
  }
</script>

<style scoped>

  .wb-body-image-box {
    padding: 50px !important;
  }

  .wb-body-image {
    width: 100%;
  }

  .wb-body-list-box{
    margin: 36px 0;
    min-height: 480px;
  }


</style>
