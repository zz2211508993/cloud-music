<template>
  <div class="comment-info">
    <!-- 标题    -->
    <slot name="hotTitle"></slot>
    <!-- 评论    -->
    <slot name="hotComment">
      <div class="comment-user"  v-for="item in hotCommentInfo">
        <img v-lazy="item.user.avatarUrl" alt="">
        <div class="user-info">
          <span class="info-nickname">{{item.user.nickname}}:</span>
          <span>{{item.content}}</span>
          <div class="user-time">
            <span class="time">{{reverse(item.timeStr)}}</span>
            <div class="user-right">
              <i class="el-icon-apple"></i>
              <span>{{item.likedCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <slot name="newTitle"></slot>
    <slot name="newComment">
      <div class="comment-user"  v-for="item in newCommentInfo">
        <img v-lazy="item.user.avatarUrl" alt="">
        <div class="user-info">
          <span class="info-nickname">{{item.user.nickname}}:</span>
          <span>{{item.content}}</span>
          <p class="reply" v-for="value in item.beReplied">
            <span class="nickname"> @ 动态{{value.user.nickname}}:</span>
            <span> {{value.content}}</span>
          </p>
          <div class="user-time">
            <span class="time">{{reverse(item.timeStr)}}</span>
            <div class="user-right">
              <i class="el-icon-apple"></i>
              <span>{{item.likedCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "CommentInfo",
  components:{
  },
  props:{
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
  },
  computed:{
    reverse(){
      return function (timeStr){
        return timeStr.split('-').reverse().join('/')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-info{
  width: 100%;
  h2{
    margin-bottom: 20px;
  }
  h3{
    font-size: 25px;
    color:black;
  }
  .comment-user{
    margin-bottom: 20px;
    display: flex;
    margin-top: 20px;
    .user-info{
      width: 100%;
      padding-left: 20px;
      .info-nickname{
        color:skyblue;
        margin-right: 5px;
      }
      .reply{
        width: 100%;
        background: #ccc;
        color:black;
        line-height: 30px;
        padding-left:20px;
        .nickname{
          color:#517eaf;
        }
      }
      .user-time{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        .time{
          color:#ccc;
          font-size: 18px;
        }
        .user-right{
          i{
            width: 20px;
            height: 20px;
            display: inline-block;
          }
          span{
            color:red;
            font-size: 18px;
          }
        }
      }
    }
    img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
}
</style>