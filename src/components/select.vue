<template>
  <div>
    <h2>快把宠物带回家吧</h2>
    <div class="wb-animal">
      <el-row :gutter="10">

        <el-col :span="6" v-for="item in list" class="wb-animal-box">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.img_link" class="image">
            <div style="padding: 14px;">
              <span>{{ item.title }}</span>
              <div class="bottom clearfix">
                <p class="time">￥{{ item.price }}</p>
                <el-button type="primary" size="mini" v-on:click="to_animal(item.pid)"
                           icon="el-icon-circle-plus">查看详情
                </el-button>
                <el-button type="primary" size="mini" v-on:click=
                  "add_chart(item.pid,item.title, item.price)"
                           icon="el-icon-circle-plus">购物车
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  import _global_ from "../Global";
  export default {
    name: "animal",
    data() {
      return {
        cid: this.$route.query.cid,
        list:[
          {
            img_link: '',
            title: '',
            price: '',
            pid: ''
          }
        ],
        cartlist: _global_.cartlist,
        mystatus: _global_.mystatus
      };
    },
    mounted(){
      this.get_list()
    },
    methods: {
      to_animal(pid){
        this.$router.push({
          name: 'Animal',
          query: {
            pid: pid
          }
        })
      },
      add_chart(pid,title, price){
        let pet_data = {
          pick: true,
          pid: pid,
          title: title,
          price: price,
          num: 1,
          max_num: 999
        };
        for(let index in this.cartlist){
          if(pid === this.cartlist[index].pid){
            this.cartlist[index].num++;
            pet_data=null
          }
        }
        if(pet_data!=null){
          this.cartlist.push(pet_data);
        }
        _global_.cartlist = this.cartlist;

        this.$message({
          message: '成功添加到购物车',
          type: 'success'
        });
      },
      get_list(){
        let that = this;
        this.$http.get('http://127.0.0.1:5000/api/get_list/'+that.cid).then(function (res) {
          that.list = res.body
        }, function (res) {
          console.log('fail' + status + "," + request);
        });
      }
    }
  }
</script>

<style scoped>

  .wb-animal {
    margin: 30px;
  }

  .wb-animal-box {
    margin-bottom: 30px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
