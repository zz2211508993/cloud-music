<template>
  <div class="search" :key="keywords">
    <search-item :keywords="keywords" :songs="songs"
                 :playlists="playlists" :mvs="mvs"
                 :songCount="songCount"
                 @song-click="songClick" @mv-click="mvClick"
                 @list-click="listClick"
    ></search-item>
  </div>

</template>

<script>
import searchItem from "./chlidComps/searchItem";
import {search} from "network/search";
import {playlist} from "../../network/leaderboard";

export default {
  name: "search",
  components:{
    searchItem,
  },
  data(){
    return{
      //用户输入的
      keywords:'',
      //保存根据用户输入的请求的数据
      songs:[],
      types:1,
      playlists:[],
      mvs:[],
      songCount:0,
    }
  },
  created() {
    this.keywords=this.$route.params.keywords;
    //调用searchRequest重新请求数据
    this.searchRequest();
    console.log(this.$route.params)
  },
  methods:{
    //歌曲
    songClick(types){
      this.types=types;
      this.searchRequest();
    },

    //歌单
    listClick(types){
      this.types=types;
      this.searchRequest();
    },
    //mv数据
    mvClick(types){
      this.types=types;
      search({keywords:this.keywords,limit:8,offset:0,type:this.types}).then(res => {
        this.mvs=res.result.mvs;
      })
    },

    searchRequest(){
      search({keywords:this.keywords,limit:10,offset:0,type:this.types}).then(res => {
        this.songs=res.result.songs;
        this.playlists=res.result.playlists;
        this.songCount=res.result.songCount;
      })
    }
  },
  watch:{
    //监听route路径的改变
    '$route'(){
      this.keywords=this.$route.params.keywords;
      //调用searchRequest重新请求数据
      this.searchRequest();
    }

  },

}
</script>

<style scoped>
.search{
  width: 100%;
}
</style>