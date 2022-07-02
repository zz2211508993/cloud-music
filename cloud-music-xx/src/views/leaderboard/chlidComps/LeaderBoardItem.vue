<template>
  <div class="leader-board-item" v-if="Object.keys(artist).length!==0">
    <h2>官方榜</h2>
    <rang-king :list="list" :ranking="ranking"></rang-king>
    <div class="song-list">
      <div class="img-bg">
        <span>歌手榜</span>
      </div>
      <img :src="artist[0].picUrl" alt="" class="img">
      <div v-for="(item,index) in artist" class="artist" :key="item.id">
        <span>{{index+1}} . {{item.name}}</span>
      </div>
    </div>
    <ul class="global">
      <li v-for="(item,index) in global" class="global-item" @click="globalClick(index)" :key="item.id">
        <img :src="item.coverImgUrl" alt="">
        <span>{{item.name}}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import RangKing from "components/content/ranking/RanKing";
export default {
  name: "LeaderBoardItem",
  components: {RangKing},
  props:{
    list:{
      type:Array,
    },
    ranking:{
      type:Array,
    },
    global:{
      type:Array,
    },
    artist:{
      type:Array,
    },
  },
  methods:{
    globalClick(index){
      this.$router.push('detail/'+this.global[index].id)
    }
  }
}
</script>

<style scoped lang="less">
  .global{
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;
    .global-item{
      width: 25%;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      img{
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }

  }
  .song-list{
    position: relative;
    img{
      width: 200px;
      height: 200px;
    }
    .artist{
      padding-left: 20px;
      line-height: 40px;
      &:last-child{
        margin-bottom: 20px;
      }
      span{
        font-size: 17px;
        color:black;
      }
    }
  }
</style>