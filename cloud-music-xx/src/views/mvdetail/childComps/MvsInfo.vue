<template>
  <div class="mvs-info">
    <div class="mvs-list" v-for="(item,index) in mvs" @click="mvsInfoClick(index)" :key="item.id">
      <img v-lazy="item.cover" alt="">
      <div class="mvs-list-name">
        <p>{{item.name}}</p>
        <p>{{item.artistName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvsInfo",
  props:{
    mvs:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data(){
    return{
    }
  },
  methods:{
    mvsInfoClick(index){
      //通过事件总线发送事件
      this.$bus.$emit('mvs-click',this.mvs[index])
    }

  }
}
</script>

<style scoped lang="less">
.mv-info{
  display: flex;
}
.mvs-list{
  display: flex;
  margin-top: 20px;
  img{
    width: 148px;
    height: 120px;
    border-radius: 10px;
    vertical-align: middle;
    margin-bottom: 20px;
  }
  .mvs-list-name{
    display: flex;
    flex-direction: column;
    p{
      margin-left: 20px;
      line-height: 40px;
      font-weight: normal;
      &:nth-child(2){
        font-size: 16px;
        color:grey;
      }
    }
  }
}
</style>