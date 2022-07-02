<template>
  <div class="singer-item" v-if="Object.keys(artists).length!==0">
<!--    <nav-bar class="nav-bar">
      <nav-bar-item class="nav-bar-item">
        <template slot="language">
          <ul class="language">
            <li>
              种类:
            </li>
            <li v-for="(item,index) in language"
                :class="{active:languageIndex === index}"
                @click="languageClick(index)"
            >
              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>
    <nav-bar>
      <nav-bar-item>
        <template slot="classify">
          <ul class="classify">
            <li>
              分类:
            </li>
            <li v-for="(item,index) in classify"
                :class="{active:classifyIndex === index}"
                @click="classifyClick(index)"
            >
              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>
    <nav-bar>
      <nav-bar-item>
        <template slot="filtrate">
          <ul class="filtrate">
            <li>
              筛选:
            </li>
            <li v-for="(item,index) in filtrate"
                :class="{active:filtrateIndex === index}"
                @click="filtrateClick(index)"
            >
              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>-->
    <nav-bar>
      <nav-bar-item class="nav-bar-item">
        <template slot="area">
          <ul class="area">
            <li>
              种类:
            </li>
            <li v-for="(item,index) in area"
                :class="{active:areaIndex === index}"
                @click="areaItemClick(index)"
                :key="item.id">

              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>
    <nav-bar>
      <nav-bar-item>
        <template slot="type">
          <ul class="type">
            <li>
              分类:
            </li>
            <li v-for="(item,index) in type"
                :class="{active:typeIndex === index}"
                @click="typeItemClick(index)"
                :key="item.id">

              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>
    <nav-bar>
      <nav-bar-item>
        <template slot="sort">
          <ul class="sort">
            <li>
              筛选:
            </li>
            <li v-for="(item,index) in filtrate"
                :class="{active:filtrateIndex === index}"
                @click="filtrateItemClick(index)"
                :key="item.id">
              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>
    <ul class="singer-info">
      <li v-if="filtrate[filtrateIndex] === '热门' && type[typeIndex] ==='全部'" @click="singerLeaderBoardClick">
        <div class="img-bg">
          <span>歌手榜</span>
        </div>
        <div class="singer-leader-board">
          <img v-lazy="artists[0].img1v1Url" alt="" class="img-first">
          <span>歌手排行榜</span>
        </div>
      </li>
      <li v-for="item in artists" @click="artistsClick(item)" :key="item.id">
        <img v-lazy="item.img1v1Url" alt="">
        <span>{{item.name}}</span>
      </li>
    </ul>
    <pagination :page-sizes="pageSizes" :total="960"
                :page-size="pageSizes[0]"
                @count-item-click="countItemClick"
                @pages-item-click="pagesItemClick"
    ></pagination>
  </div>
</template>

<script>

import navBar from "components/content/navbar/navBar";
import NavBarItem from "components/content/navbar/childComps/navBarItem";
import Pagination from "../../../components/common/pagination/pagination";
export default {
  name: "SingerItem",
  components: {
    Pagination,
    navBar,
    NavBarItem,
  },
  props:{
    artists:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data(){
      return {
        //种类
        area:['全部','华语','欧美','日本','韩国','其他'],
        //分类
        type:['全部','男歌手','女歌手','乐队组合'],
        //筛选
        filtrate:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z','#'],
        //种类的请求
        areaRequest:[-1,7,96,8,16,0],
        //分类的请求
        typeRequest:[-1,1,2,3],
        //筛选的请求
        filtrateRequest:[-1,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z','#'],
        //保存着 area的索引
        areaIndex:0,
        typeIndex:0,
        filtrateIndex:0,
        //默认显示第几页
        currentPage4: 1,
        //页数
        pageSizes:[30, 50, 80, 100]
      }
    },
  methods:{
      //点击种类
      areaItemClick(index){
        this.areaIndex=index;
        this.$emit('area-click',this.areaRequest[index]);
      },
    //点击分类
      typeItemClick(index){
        this.typeIndex=index;
        this.$emit('type-click',this.typeRequest[index]);
      },
    //点击筛选
      filtrateItemClick(index){
        this.filtrateIndex=index;
        console.log(this.filtrate[index])
        this.$emit('filtrate-click',this.filtrateRequest[index]);
      },
      //一页显示多少条数据
      countItemClick(val) {
        this.$emit('switch-number-click',val)
      },
    //点击页数切换页数对应的内容
      pagesItemClick(val) {
        this.$emit('switch-pages-click',val - 1)
      },
    //歌手的点击事件
      artistsClick(item){
          this.$router.push({
            path:'singdetail',
          });
            this.$store.dispatch('singerItemClick',item);
      },
    //歌手排行榜的点击事件
      singerLeaderBoardClick(){
          this.$router.push('singerleaderboard')
      }
    },
}
</script>

<style scoped lang="less">
.singer-item{
  margin-top: 20px;
  .nav-bar{
    .nav-bar-item{
      ul{
        li{
          margin-right: 20px !important;
        }
      }
    }
  };
  .singer-info{
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    li{
      width: 25%;
      display: flex;
      flex-direction: column;
      .singer-leader-board{
        span{
          width: 100%;
          display: inline-block;
        }
      }
      img{
        width: 200px;
        height: 200px;
        margin-bottom: 10px;
      }
      span{
        margin-bottom: 10px;
      }
    }

  }
}

</style>