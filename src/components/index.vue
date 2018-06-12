<template>
  <div class="wb-body">
    <el-row :gutter="20">
      <el-col :xs=24 :sm=14 class="wb-body-image-box hidden-xs-only">
        <img class="wb-body-image" src="../assets/splash.gif"/>
      </el-col>
      <el-col :xs=24 :sm=10>
        <h2>Welcome come to phpetstore</h2>
        <el-card class="wb-body-list-box">
          <el-collapse accordion>
            <el-collapse-item v-for="item in goods_class" :key="id">
              <template slot="title">
                <i class="header-icon el-icon-info"></i>{{ item.goods_name }}
              </template>
              <el-table :data="item.goods_tab" :show-header="false">
                <el-table-column prop="name">
                </el-table-column>
                <el-table-column prop="desc">
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
        goods_class: [
          {
            goods_name: '鱼类',
            goods_image: '',
            goods_tab:[
              {
                id: 'fish-001',
                name:"金鱼",
                desc:"金鱼是一种很好玩的鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
            ]
          },
          {
            goods_name: '鱼类',
            goods_image: '',
            goods_tab:[
              {
                id: 'fish-001',
                name:"金鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
            ]
          },{
            goods_name: '鱼类',
            goods_image: '',
            goods_tab:[
              {
                id: 'fish-001',
                name:"金鱼"
              },
              {
                id: 'fish-002',
                name:"鲨鱼"
              },
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .wb-body {
    max-width: 1000px;
    margin: auto;
  }

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
