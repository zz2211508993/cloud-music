<template>
  <div class="individuation">
    <individuation-list
        :bannerItem="bannerItem" :personalizedItem="personalizedItem"
        :recommendItem="recommendItem" :exclusive='exclusive' :newSong="newSong"
        @recommend-click="recommendClick"
        @exclusive-click="exclusiveClick"
    ></individuation-list>
  </div>
</template>

<script>
import {banner,personalize} from "network/individuation";
import IndividuationList from "./chlidComps/IndividuationList";
import {personalized} from "../../network/individuation";

export default {
  name: "Individuation",
  components: {IndividuationList},
  data(){
    return {
      //轮播图
      bannerItem:null,
      //推荐歌单
      personalizedItem:null,
      //推荐mv的数据
      recommendItem:null,
      //独家放送
      exclusive:[],
      //最新音乐
      newSong:[],
      //播放量
      playCount:0,
    }
  },
  created() {
    //轮播图
    banner().then(res=>{
      this.bannerItem=res.banners;
    })
    //推荐歌单的数据
    personalized({limit:10}).then(res=>{
      this.personalizedItem=res.result;
    })
    //独家放送的数据
    personalized({},'privatecontent').then(res=>{
      this.exclusive=res.result;
    })
    //最新音乐的数据
    personalized({},'newsong').then(res=>{
      this.newSong=res.result;
    })
    //推荐mv的数据
    personalized({},'mv').then(res=>{
      this.recommendItem=res.result;
      //截取数组个数
      this.recommendItem.splice(3);
    })


  },
  methods:{
    //推荐mv的数据
    recommendClick(recommend){
      //跳转到详情mv
      this.$router.push('mvdetail/'+recommend.id);
    },
    //独家放送的数据
    exclusiveClick(recommend){
      //跳转到详情mv
      this.$router.push('mvdetail/'+recommend.id);
    }
  }
}
</script>

<style scoped lang="less">
</style>