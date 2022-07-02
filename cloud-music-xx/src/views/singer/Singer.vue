<template>
  <div class="singer">
    <singer-item
         :artists="artists"
         @area-click="areaClick"
         @type-click="typeClick"
         @filtrate-click="filtrateClick"
         @switch-pages-click="switchPagesClick"
         @switch-number-click="switchNumberClick"
    ></singer-item>
  </div>
</template>

<script>

import SingerItem from "./chlidComps/SingerItem";
import {singer} from "network/singer";
export default {
  name: "Singer",
  components: {SingerItem},
  data(){
    return{
      artists:[],
      areaItem:0,
      typeItem:0,
      filtrateItem:0,
      offset:0,
      limit:0,
    }
  },
  created() {
    //歌手的信息
    singer({type:-1,area:-1,limit:30,offset:0,initial:-1}).then(res =>{
      this.artists=res.artists;
    })
  },
  methods:{
    areaClick(load){
      this.areaItem=load;
      this.singerRequest();
    },
    typeClick(load){
      this.typeItem=load;
      this.singerRequest();
    },
    filtrateClick(load){
      this.filtrateItem=load;
      this.singerRequest();
    },
    //切换页数对应的内容
    switchPagesClick(offset){
      this.offset=offset;
      this.singerRequest()
    },
    //切换条数对应的内容
    switchNumberClick(limit){
      this.limit=limit;
      this.singerRequest();
    },
    singerRequest(){
      singer({type:this.typeItem || -1,area:this.areaItem || -1,limit:this.limit|| 30,offset:this.offset *30 || 0,initial:this.filtrateItem || -1}).then(res => {
        this.artists=res.artists;
        console.log(this.artists)
      })
    }
  }
}
</script>

<style scoped>

</style>