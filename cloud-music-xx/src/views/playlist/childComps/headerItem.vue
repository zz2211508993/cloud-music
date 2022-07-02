<template>
  <div class="header-item">
    <div class="item-left" v-for="item in headerItem" :key="item.id">
      <img :src="item.coverImgUrl" alt="">
    </div>
    <img :src="item.coverImgUrl" alt="" class="bg-img" v-for="item in headerItem" :key="item.id">
    <div class="item-right" v-for="item in headerItem">
      <div class="boutique">
        <i class="el-icon-headset"></i>
        <span>精品歌单</span>
      </div>
      <p class="item-name">{{item.name}}</p>
      <span class="item-copywrite">{{item.copywriter}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerItem",
  props:{
    headerItem:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped lang="less">
.header-item {
  position: relative;
  display: flex;
  height: 200px;
  overflow: hidden;
  left:0;
  z-index: 88;
  .bg-img{
    position: absolute;
    left:0;
    right:0;
    width: 100%;
    filter: blur(50px);
    z-index: 0;

  }
  .item-left {
    position: absolute;
    left:0;
    background: rgba(0,0,0,.3);
    z-index:100;
      img{
        width: 160px;
        height: 160px;
        margin: 20px;
      }
  }
  .item-right{
    position: absolute;
    z-index: 101;
    left:200px;
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,.3);
    .boutique{
      margin:20px 0;
      width: 104px;
      height: 35px;
      line-height: 35px;
      border-radius: 10px;
      border:2px solid #ffc063;
      i{
        width: 18px;
        height: 18px;
        display: inline-block;
        color:#ffc063;
        margin: 0 3px 0 10px;
      }
      span{
        color:#ffc063;
      }
    }
    .item-name{
      margin: 10px 0;
      font-size:16px;
      color:white;
    }
    .item-copywrite{
      color:gray;
    }
  }

}
</style>