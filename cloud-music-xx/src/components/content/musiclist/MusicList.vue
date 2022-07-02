<template>
  <div class="music-list">
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MusicList",
  data(){
    return {
      array:[],
    }
  },
  props:{
    title:{
      type:String,
    },

    mounted(){
    }


  }
}
</script>

<style  lang="less">
.music-list{
  p{
    font-size: 20px;
    color:black;
    font-weight: bold;
  }
   ul{
    display: flex;
    flex-wrap: wrap;
    .col{
      .col-item{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        margin-top: 20px;
        img{
          width: 250px;
          height: 250px;
          border-radius: 10px;
        }
        span{
          width: 100%;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>