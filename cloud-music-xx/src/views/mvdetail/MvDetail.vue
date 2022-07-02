<template>
  <div class="mv-detail">
    <mv-detail-list
        :url="url"
        :mv-info="mvInfo"
        :mvs="mvs"
        :hot-comment-info="hotCommentInfo"
        :new-comment-info="newCommentInfo"
        @mvs-click="mvsClick"

    ></mv-detail-list>
  </div>
</template>

<script>
import MvDetailList from "./childComps/MvDetailList";
import {MvDetail,mvUrl,CommentMv,SimiMV} from "network/mvDetail";

export default {
  name: "MvDetail",
  components:{
    MvDetailList,
  },
  data(){
    return {
      id:0,
      url:'',
      mvInfo:{},
      mvs:[],
      hotCommentInfo:[],
      newCommentInfo:[],
    }
  },
  created() {
    //mv 地址
    this.id=this.$route.params.id;
    mvUrl({id:this.id}).then(res =>{
      this.url=res.data.url;
    })
    //获取 mv 数据
    MvDetail({mvid:this.id}).then(res => {
      this.mvInfo=res.data;
      console.log(this.mvInfo)
    })
    //相识mv
    SimiMV({mvid:this.id}).then(res => {
      this.mvs=res.mvs
    })
    //mv 评论
   // /comment/mv?id=5436712
    CommentMv({id:this.id,limit:20}).then(res =>{
      this.hotCommentInfo=res.hotComments;
      this.newCommentInfo=res.comments;
    })
    //使用事件总线
    this.$bus.$on('mvs-click',(mvs)=>{
      this.mvsClick(mvs);
    })
  },
  methods:{
    //点击相关推荐，重新请求数据
    mvsClick(mvs){
      mvUrl({id:mvs.id}).then(res => {
        this.url=res.data.url;
        if(this.url ===res.url) return false;
      })
      MvDetail({mvid:mvs.id}).then(res => {
        this.mvInfo=res.data;
      })

    }
  }
}
</script>

<style scoped>

</style>