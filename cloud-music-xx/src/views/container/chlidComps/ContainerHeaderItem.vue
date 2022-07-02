<template>
  <div class="header">
    <ul class="header-left">
      <li class="left-item">
        <img src="~assets/img/header/header-muisc.png">
      </li>
      <li class="left-item">
        <history-button></history-button>
      </li>
      <li class="left-item left-item-search">
        <input type="text" class="search" placeholder="输入搜索的音乐"
               @change="changeSearch"
               @keyup.enter="keyEnter"
        >
        <i class="el-icon-search"></i>
      </li>
    </ul>
    <ol class="header-right">
      <li class="right-item">
        <div class="side-bar">
          <el-switch
              v-model="value1"
              inactive-text="侧边栏"
              active-color="#13ce66"
              class="switch"
              @change="change1"
          >
          </el-switch>
        </div>
      </li>
      <li class="right-item">
        <div class="music-bar">
          <el-switch
              v-model="value2"
              inactive-text="音乐栏"
              active-color="#13ce66"
              class="switch"
              @change="change2"
          >
          </el-switch>
        </div>
      </li>
      <li class="right-item">
        <div class="mini-bar">
          <el-switch
              v-model="value3"
              inactive-text="mini音乐栏"
              active-color="#13ce66"
              class="switch"
              @change="change3"
          >
          </el-switch>
        </div>
      </li>
      <li class="right-item right-item-login">
          <div class="demo-basic--circle">
            <div class="block" v-for="size in sizeList" :key="size">
              <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </div>
          </div>
        <div class="login">
          <span>登录</span>
          <span>/</span>
          <span>注册</span>
        </div>
      </li>
      <li class="right-item right-item-gitHub">
        <i class="el-icon-headset"></i>
        <i class="el-icon-share"></i>
      </li>
      <li class="right-item right-item-drop-down">
          <span>下拉菜单</span>
          <i class="el-icon-arrow-down"></i>
      </li>
    </ol>
  </div>
</template>

<script>
import HistoryButton from "components/common/historyButton/HistoryButton";
export default {
  name: "ContainerHeaderItem",
  components:{
    HistoryButton,
  },
  data(){
    return {
      value1:true,
      value2:true,
      value3:false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["small"],
      value:''
    }
  },
  methods:{
    //侧边栏
    change1(value){
      this.$bus.$emit('sidebar-click',value);
    },
    change2(value){
      this.$bus.$emit('music-click',value);
    },
    change3(value){
      this.$bus.$emit('mini-click',value);
    },

    //输入框输入的内容
    changeSearch(input) {
      this.value=input.target.value;
      if(input.target.value.length === 0){
        this.keyEnter();
        return false;
      }else{
        this.$router.push('/home/search/'+input.target.value);
        return true;
      }
      //重新加载当前文档
      // location.reload()
    },
    //空格按下事件
    keyEnter(){
      if(this.value.length===0){
        alert('请输入内容不能为空');
      }
    }

  },
}
</script>

<style scoped lang="less">
  .header{
    display:flex;
    height: 100%;
    text-align: center;
    .header-left{
      min-width: 750px;
      min-height: 50px !important;
      display: inline-block;
      padding-top: 7px;
      float: left;
      .left-item{
        float: left;
        img{
          width: 140px;
          height: 25px;
          vertical-align: middle;
          margin-top: 5px;
        }
      }
      .left-item-search{
        position: relative;
        .search{
          width: 287px;
          height: 32px;
          border-radius: 20px;
          font-size: 12px;
          margin-left: 20px;
          padding-left: 30px;
          box-sizing: border-box;
          border: 1px solid #ccc;
        }
        i{
          position: absolute;
          left:30px;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }
    .header-right{
      min-width: 700px;
      min-height: 100%;
      float: right;
      display: inline-block;
      line-height: 40px;
      margin-left: 50px;
      li{
        float: left;
      }
      .right-item{
        .switch{
          margin-right: 10px;
        }
      }
      .right-item-login{
        font-size: 14px;
        display: inline-block;
        .demo-basic--circle{
          float: left;
          margin-top: 6px;
        }
        .login{
          float: right;
        }
        span{
          margin-left: 10px;
        }
      }
      .right-item-gitHub{
        margin: 0 15px;
        i{
          margin-right: 10px;
        }
      }
      .right-item-drop-down{
        span{
          margin-right: 5px;
        }
      }
    }
  }

</style>