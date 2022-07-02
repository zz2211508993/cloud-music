<template>
    <div class="music-mv">
      <div class="mv-item">
        <p>{{title}}</p>
        <slot>
        </slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "MusicMv",
  components:{
  },
  props:{
    title:{
      type:String,
      default(){
        return []
      }
    },
    recommendItem:{
      type:Array,
      default(){
        return []
      }
    },

  }
}
</script>

<style  lang="less">
.music-mv{
  width: 100%;
  overflow: hidden;
  .mv-item {
    margin-bottom: 30px;
    p {
      font-size: 20px;
      color: black;
      font-weight: bold;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      .col {
        .col-item {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          margin-top: 20px;

          img {
            width: 250px;
            height: 250px;
            border-radius: 10px;
          }
          span {
            width: 250px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
    }
  }
}
</style>