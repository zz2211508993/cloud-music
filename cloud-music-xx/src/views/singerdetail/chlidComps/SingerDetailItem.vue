<template>
  <div class="singer-detail-item">
    <header class="header">
      <div class="header-left" v-if="artistDetail.cover !==undefined">
        <img v-lazy="artistDetail.cover" alt="">
      </div>
      <div class="header-info">
        <div class="singer-info">
          <span class="singer">歌手</span>
          <span class="singer-name">{{artistDetail.name}}</span>
        </div>
        <button class="collect ">收藏</button>
        <div class="singer-song">
          <p>歌曲: <em>{{artistDetail.musicSize}}</em></p>
          <p>专辑: <em>{{artistDetail.albumSize}}</em></p>
          <p>MV: <em>{{artistDetail.mvSize}}</em></p>
        </div>
      </div>
    </header>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="专辑" name="first">
        <div class="hot-album" v-for="(item,index) in hotAlbum">
          <img v-lazy="item.blurPicUrl" alt="">
          <div class="hot-album-right">
            <h2>{{item.name}}</h2>
            <p v-for='(item,index) in song[index]' class="song">
              <span>{{index+1}}.</span>
              <span>{{item.name}}</span>
            </p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <ul class="mvs">
          <li v-for="item in mvs" @click="mvsClick(item)" :key="item.id">>
            <img v-lazy="item.imgurl" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="third">
        <div class="desc">
            <p class="desc-brieDesc">
              简介:{{desc.briefDesc}}
            </p>
          <div class="desc-introduction" v-for="item in desc.introduction" :key="item.id">
            <h4>{{item.ti}}:</h4>
            <p>{{item.txt}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="fourth">
        <ul class="artist-simi">
          <li v-for="item in artistSimi" @click="artistSimiItemClick(item)" :key="item.id">>
            <img v-lazy="item.picUrl" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "SingerDetailItem",
  props:{
    //歌手详情
    artistDetail:{
      type:Object,
      default(){
        return {};
      },
    },
    //专辑
    hotAlbum:{
    },
    //mv
    mvs:{
      type:Array,
      default(){
        return [];
      }
    },
    //相似歌手
    artistSimi:{
      type:Array,
      default(){
        return[];
      }
    },
    //歌手的描述信息
    desc:{
      type:Object,
      default(){
        return{

        }
      }
    },
    //
    song:{
      type:Array,
      default(){
        return[];
      }
    }


  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {
    },
    //相似歌手中的歌手的点击事件
    artistSimiItemClick(item){
      this.$emit('artist-simi-click',item)
    },
    //mv的数据信息
    mvsClick(mvs) {
      this.$router.push('mvdetail/'+mvs.id);
    }
  },



}
</script>

<style scoped lang="less">
.singer-detail-item{
  width: 100%;
  .header{
    padding-top:35px;
    display: flex;
    margin-bottom: 25px;
    .header-left{
      img{
        width: 300px;
        height: 240px;
      }
    }
    .header-info{
      padding:0 0 0 50px;
      .singer{
        width: 72px;
        height: 38px;
        border:1px solid #e83c3c;
        border-top:none;
        display: inline-block;
        line-height: 38px;
        text-align: center;
        font-size: 20px;
        color:#e83c3c;
        border-radius: 7px;
        margin-right: 20px;
      }
      span{
        font-weight: bold;
      }
      .singer-name{
        font-size: 30px;
        color:black;
      }
      .collect{
        margin-top: 20px;
        width: 70px;
        height: 40px;
        border: 1px solid #dcdfe6;
        background: #fff;
      }
      .singer-song{
        margin-top: 20px;
        p{
          line-height: 35px;
          font-size: 17px;
          font-family: "微软雅黑";
          color:black;
        }
      }
    }
  }
}
.mvs{
  display: flex;
  flex-wrap: wrap;
  align-items:flex-end;
  li{
    width: 20%;
    img{
      width: 80%;
      border-radius: 10px;
    }
    span{
      width: 100%;
      display: inline-block;
      font-size: 18px;
    }
  }
}
.artist-simi{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li{
    width: 20%;
    text-align: center;
    img{
      width: 85%;
      border-radius: 5px;
    }
    span{
      width: 100%;
      display: inline-block;
    }
  }
}
.desc{
  .desc-brieDesc{
    font-size: 20px;
    line-height: 40px;
    word-break:break-word;
    //根据空格换行
    white-space: break-spaces;
  }
  .desc-introduction{
    margin-bottom: 20px;
    h4{
      color:black;
      margin-bottom: 20px;
    }
    p{
      line-height: 40px;
      white-space: break-spaces;
      font-size: 18px;
    }
  }
}
.hot-album{
  display: flex;
  margin-bottom: 20px;
  img{
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  .hot-album-right{
    padding: 20px;
    .song{
      margin-top: 10px;
      span{
        font-size: 18px;
        color:black;
        &:nth-child(1){
          margin-right: 10px;
        }
      }
    }
  }

}
</style>