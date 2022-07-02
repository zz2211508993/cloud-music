<template>
  <div class="mv-detail-list">
    <div class="mv-detail-list-left">
      <p>< mv详情</p>
      <video :poster="mvInfo.cover" controls>
        <source v-lazy="url" type="audio/mp4">
        <source v-lazy="url" type="audio/ogg">
        <source v-lazy="url" type="audio/mpeg">
        <source v-lazy="url" type="audio/video/webm">
      </video>
      <div class="mv-info">
        <div class="mv-artistName">
          <img v-lazy="item.img1v1Url" alt="" v-for="item in mvInfo.artists" :key="item.id">
          <span>{{mvInfo.artistName}}</span>
        </div>
        <h3 class="mv-name">{{mvInfo.name}}</h3>
        <div class="mv-publish">
            <span class="publishTime">发布:{{mvInfo.publishTime}}</span>
            <span class="playCount">播放:{{mvInfo.playCount}}次</span>
        </div>
        <comment-info :hot-comment-info="hotCommentInfo">
          <template slot="hotTitle"><h2>精彩评论 ({{hotCommentInfo.length}})</h2></template>
          <template slot="hotComment">
          </template>
        </comment-info>
        <comment-info :new-comment-info="newCommentInfo">
          <template slot="newTitle"><h2>最新评论 ({{newCommentInfo.length}})</h2></template>
          <template slot="newComment">
          </template>
        </comment-info>
      </div>
    </div>
    <div class="mv-detail-list-right">
      <p>相关推荐</p>
      <mvs-info :mvs="mvs"></mvs-info>
    </div>
  </div>
</template>

<script>
import CommentInfo from "components/content/commentInfo/CommentInfo";
import MvsInfo from "./MvsInfo";
export default {
  name: "MvDetailIList",
  components: {CommentInfo,MvsInfo},
  props:{
    url:{
      type:String,
      default:'',
    },
    mvInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    mvs:{
      type:Array,
      default(){
        return []
      }
    },
    hotCommentInfo:{
      type:Array,
      default(){
        return []
      }
    },
    newCommentInfo:{
      type:Array,
      default(){
        return []
      }
    }

  }
}
</script>

<style scoped lang="less">
.mv-detail-list{
  display: flex;
  p{
    margin-top: 20px;
    font-size: 20px;
    color:black;
    font-weight: bold;
  }
}
.mv-detail-list-left{
  width: 615px;
  padding:0 30px;
  video{
    width: 553px;
    height: 400px;
  }
  .mv-info{
    margin-top: 30px;
    .mv-name{
      font-size: 30px;
      margin-left: 10px;
    }
    .mv-artistName{
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .mv-publish{
      margin-top: 30px;
      margin-bottom: 30px;
      span{
        font-size: 18px;
        color:grey;
        margin-right: 20px;
      }
    }
  }
}
.mv-detail-list-right{
  padding-left: 150px;
}

</style>