<template>
  <div class="singer-leader-board">
    <singer-leader-board-item :artists="artists" @area-click="areaClick">

    </singer-leader-board-item>
  </div>
</template>

<script>
import SingerLeaderBoardItem from "./chlidComps/SingerLeaderBoardItem";
import {artistLeaderBoard} from 'network/singerLeaderBoard'
export default {
  name: "SingerLeaderBoard",
  components: {SingerLeaderBoardItem},
  data(){
    return {
      artists:[],
      type:1,
    }
  },
  created() {
    //排行榜歌手的信息
    this.artistLeaderBoardRequest();

    //监听点击歌手的事件
/*    this.$bus.$on('artistLeaderBoardClick',(res)=>{
    })*/
  },
  methods:{
    //排行榜歌手的信息
    artistLeaderBoardRequest(){
      artistLeaderBoard({type:this.type}).then(res => {
        this.artists=res.list.artists;
        console.log(this.artists)
      })
    },
    //地区的点击事件
    areaClick(types){
      this.type=types;
      this.artistLeaderBoardRequest()
    }
  }

}
</script>

<style scoped>

</style>