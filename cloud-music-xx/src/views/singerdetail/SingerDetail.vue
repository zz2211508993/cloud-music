<template>
  <div class="singer-detail">
      <singer-detail-item
          :artist-detail="artistDetail"
          :mvs="mvs"
          :artist-simi="artistSimi"
          :desc="desc"
          :hot-album="hotAlbum"
          :song-album="songAlbum"
          :song="song"
          @artist-simi-click="artistSimiClick"
      ></singer-detail-item>
  </div>
</template>

<script>
import SingerDetailItem from "./chlidComps/SingerDetailItem";
import {artist,simiArtist,album} from "network/singerDetail";
export default {
  name: "SingerDetail",
  components:{
    SingerDetailItem,
  },
  props:{
  },
  data(){
    return{
      artistDetail:{},
      mvs:[],
      artistSimi:[],
      //简介
      desc:{},
      //专辑
      hotAlbum:{},
      //专辑对应的歌
      songAlbum:[],
      song:[],

      //保存state中的singerItem
      singerItem:[],
    }
  },
  created() {
          this.singerItem=this.$store.state.singItem;
          this.singerRequest()
  },
  methods:{
    artistSimiClick(artistItem){
      //切换当前点击歌手的信息
      this.singerItem=artistItem;
      //切换当前点击歌手的信息
      this.singerRequest();
    },
    singerRequest(){
      //歌手的mv
      artist('mv',{id:this.singerItem.id}).then(res => {
        this.mvs=res.mvs;
      })
      //歌手的描述信息
      artist('desc',{id:this.singerItem.id}).then(res => {
        console.log(res);
        this.desc=res;
      })
      //歌手的详情信息
      artist('detail',{id:this.singerItem.id}).then(res => {
        this.artistDetail=res.data.artist;
      })

      //相似歌手的信息
      simiArtist({id:this.singerItem.id}).then(res => {
        this.artistSimi=res.artists;
      })
      //歌手专辑
      artist('album',{id:this.singerItem.id}).then(res => {
        this.hotAlbum=res.hotAlbums;
        this.hotAlbum.forEach((value, index, array)=>{
          album({id:value.id}).then(res =>{
            this.song.push(res.songs);
          })
        })
      })
    }
  }

}
</script>

<style scoped>
  .singer-detail{
    width: 100%;
  }
</style>