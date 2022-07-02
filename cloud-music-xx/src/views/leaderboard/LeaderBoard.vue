<template>
  <div class="leader-board">
    <leader-board-item
        :list="list"
        :ranking="ranking"
        :global="global"
        :artist="artist"
    ></leader-board-item>
  </div>
</template>

<script>
import {leaderboard,playlist} from "network/leaderboard";
import LeaderBoardItem from "./chlidComps/LeaderBoardItem";
export default {
  name: "LeaderBoard",
  components: {LeaderBoardItem},
  data(){
    return{
      list:[],
      ranking:[],
      global:[],
      artist:[],
    }
  },
  created() {
    leaderboard('detail').then(res => {
      this.list=res.list;
      this.global=this.list.splice(4);
      for(let item of this.list){
        //根据id渲染排行榜
        playlist({id:item.id}).then(res =>{
          res.playlist.tracks.splice(5);
          this.tracks=res.playlist.tracks;
          this.ranking.push(this.tracks);
        })
      }
    })

    leaderboard('artist').then(res =>{
      this.artist=res.list.artists;
      this.artist.splice(5);
    })



  }
}
</script>

<style scoped>

</style>