<template>
    <div class="aside">
      <ul class="navbar">
        <li
            v-for="(item,index) in navTitle" :key="item"
        >
            <router-link
                :to="{path:'/home'+toGo[index]}"
                :class='{active:index === currentIndex}'
                @click.native="itemClick(index)"
            >
            <i class="el-icon-eleme"></i>
            <span>{{item}}</span>
            </router-link>

        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "ContainerAside",
  data(){
    return {
      navTitle:['个性推荐','歌单推荐','最新音乐','最新mv','排行版','歌手'],
      toGo:['/individuation','/playlist','/songs','/mv','/leaderboard','/singer'],
      currentIndex:0,
      //显示还是隐藏侧边栏
      value:true,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
    },
  }
}
</script>

<style scoped lang="less">
  .aside{
    width: 200px;
    border-left: 1px solid bisque;
    border-right: 1px solid bisque;
    box-sizing: border-box;
    height: 100vh;
    position:fixed;
    top:50px;
    ul{
      li{
        height: 60px;
        width: 100%;
        padding-left: 20px;
        line-height: 60px;
        font-size: 12px;
        &:hover{
          background: pink;
        }
        i{
          margin-right: 10px;
        }
        .active{
          color:red;
        }
      }
    }
  }
</style>