<template>
  <div class="wb-body">
    <el-row :gutter="20">
      <el-col :xs=24 :sm=8>
        <el-table :data="goods_species" @cell-click="chose_species" stripe>
          <el-table-column prop="goods_name" label="宠物类型">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :xs=24 :sm=8>
        <el-table :data="goods_tab" @cell-click="chose_variety" stripe>
          <el-table-column prop="name" label="宠物品种">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :xs=24 :sm=8>
        <el-table :data="goods_list" stripe>
          <el-table-column prop="date" label="宠物详情">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "animal",
    data() {
      return {
        goods_species: [
          {
            index: 1,
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
            index: 2,
            goods_name: '鸟类',
            goods_image: '',
            goods_tab:[
              {
                id: 'fish-001',
                name:"金鸟"
              },
              {
                id: 'fish-002',
                name:"鲨鸟"
              },
            ]
          }
        ],
        goods_tab: [],
        goods_list: []
      }
    },
    methods:{
      chose_species(row, column){
        this.goods_tab = row.goods_tab
      },
      chose_variety(row){
        console.log(row.id);
      }
    }
  }
</script>

<style scoped>
  .wb-body{
    width: 1000px;
    margin: auto;
  }
</style>
