<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="10">
        <img :src="pet.img_link" class="wb-image">
      </el-col>
      <el-col :span="14">
        <div>
          <h2>{{ pet.title }}</h2>
        </div>
        <div>
          <p>{{ pet.intro }}</p>
        </div>
        <div>
          <p>￥{{ pet.price }}</p>
          <p>当前余量{{ pet.num }}只</p>
        </div>
        <div>
          <el-button type="primary" size="mini"  v-on:click="add_chart(item.pid)"
                     icon="el-icon-circle-plus">购物车
        </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _global_ from "../Global";
  export default {
    name: "animal",
    data() {
      return {
        pet: {
          img_link: '',
          title: '',
          intro: '',
          price: '',
          num: ''
        },
        pid: this.$route.query.pid
      };
    },
    mounted(){
      this.get_animal()
    },
    methods: {
      get_animal(){
        let that = this;
        this.$http.get('http://127.0.0.1:5000/api/get_animal/'+that.pid).then(function (res) {
          that.pet = res.body[0]
        }, function (res) {
          console.log('fail' + status + "," + request);
        });
      }
    }
  }
</script>

<style scoped>
  .wb-image {
    width: 100%;
    padding: 30px;
  }
</style>
