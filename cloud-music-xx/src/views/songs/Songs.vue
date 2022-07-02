<template>
  <div class="songs">
    <song-item :types="types" :song="song" @song-click="songClick"></song-item>
  </div>
</template>

<script>
import {song} from "../../network/songs";
import SongItem from "./childComps/SongItem";
export default {
  name: "Songs",
  components:{
    SongItem
  },
  data(){
    return{
      types:['全部','华语','欧美','日本','韩国'],
      song:null,
      id:0,
    }
  },
  methods:{
    songClick(loadData){
      this.id=loadData;

      song({type:this.id}).then(res => {
        this.song=res.data;
      })
    }
  },
  created() {
    song({type:0}).then(res => {
      this.song=res.data;
      console.log(this.song);
    })
  },
}
</script>

<style scoped>
</style>