<template>
    <ul class="artist-leader-board">
        <li v-for="(item,index) in artists" @click="artistLeaderBoardItemClick(item)" :key="item.id">
          <h4>{{index + 1}}</h4>
          <p class="artist-img">
            <img v-lazy="item.img1v1Url">
          </p>
          <div class="artist-name">
              <p>{{item.name}}</p>
              <p>热度:{{item.score}}</p>
          </div>
        </li>
    </ul>
</template>

<script>
export default {
  name: "artistLeaderBoard",
  props:{
    artists:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  methods:{
    //歌手的点击之后跳转到歌手的详情页
    artistLeaderBoardItemClick(item){
      this.$router.push('singdetail');
      //发送给actions中的singerItems通知mutations修改state中的数据，并将item传递给actions，让actions传递给mutations
      this.$store.dispatch('singerItemClick',item);

    }



  }
}
</script>

<style scoped lang="less">
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 100%;
      height: 174px;
      display: flex;
      margin-right: 10px;
      align-items: center;
      position:relative;
      //-n从第一个到第3个就结束
      &:nth-child(-n+3){
        width: 30%;
        justify-content: space-between;
        .artist-name{
          display: flex;
          margin-top: 50px;
          position: absolute;
          left:40%;
          transform: translateX(-50%);
          flex-direction: column;
          top:-10px;
          line-height: 30px;
        }
        .artist-img{
          position: absolute;
          right: 0;
          img{
            width: 100px;
            height: 100px;
          }
        }
        h4{
          display: flex;
          font-size: 40px;
          color:lightpink;
          width: 100px;
        }
      };
      h4{
        margin-right: 20px;
      }
    .artist-img{
      margin-right: 10px;
      img{
        width: 100px;
        height: 100px;
      }
    };
    .artist-name{
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: space-between;
      p{

      }
    }
      &:hover{
        background: #dcdfe6;
      }

    }
  }
</style>