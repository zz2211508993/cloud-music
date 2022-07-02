<template>
<div class="search-item">
  <div class="title">
    <h2>{{keywords}}</h2>
    <p>共找到 {{songCount || 0}}个结果</p>
  </div>
  <el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="歌曲" name="first">
      <el-table
          :data="songs"
          style="width: 100%">
        <el-table-column
            label="#"
            width="180">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="音乐标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="artists[0].name"
            label="歌手">
        </el-table-column>
        <el-table-column
            prop="album.name"
            label="专辑">
        </el-table-column>
        <el-table-column
            label="时长">
          <template slot-scope="scope">
            {{FormatTime(scope.row.duration /1000)}}
          </template>
        </el-table-column>

      </el-table>
    </el-tab-pane>
    <el-tab-pane label="歌单" name="second">
      <music-list title="">
        <ul class="recommend-song">
          <li
              v-for="(item,index) in playlists" @click="playlistsClick(index)"
          >
            <div class="col-item">
              <img v-lazy="item.coverImgUrl" alt="">
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </music-list>
    </el-tab-pane>
    <el-tab-pane label="mv" name="third">
      <music-mv title="">
        <el-row class="row">
          <el-col class="col" :span="6" v-for="(item,index) in mvs" @click.native="mvsClick(index)" :key="item.id">
            <div class="col-item">
              <img v-lazy="item.cover" alt="">
              <span>{{item.name}}</span>
              <span>{{item.artists[0].name}}</span>
            </div>
          </el-col>
        </el-row>
      </music-mv>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import MusicList from "components/content/musiclist/MusicList";
import MusicMv from "components/content/musicmv/MusicMv";
export default {
  name: "searchItem",
  components:{
    MusicList,
    MusicMv
  },
  data(){
    return{
      //用户输入的内容
      activeName: 'first',
      types:1,
    }
  },
  props:{
    //保存根据用户输入的请求的数据
    keywords:{
      type:String,
    },
    //保存的找到多少条结果
    songCount:{
      type:Number,
    },
    //歌曲的信息
    songs:{
      type:Array,
      default(){
        return [];
      }
    },
    //歌单
    playlists:{
      type:Array,
      default(){
        return[];
      }
    },
    //mv的信息
    mvs:{
      type:Array,
    }
  },
  created() {

  },
  methods: {
    //tab的点击事件
    tabClick(){
      if(this.activeName === 'second'){
        this.types=1000;
        //歌单的types
        this.$emit('list-click',this.types)
      }else if(this.activeName === 'third'){
        //mv的types
        this.types=1004;
        this.$emit('mv-click',this.types)
        //歌曲
      }else if(this.activeName === 'first'){
        this.types=1;
        this.$emit('song-click',this.types)

      }
    },
    //歌单数据的点击事件
    playlistsClick(index){
      console.log(index);
    },
    //mv的点击事件
    mvsClick(){

    },
    FormatTime(times) {
      let t;
      if (times > -1) {
        var hour = Math.floor(times / 3600);
        var min = Math.floor(times / 60) % 60;
        var sec = times % 60;
        t = hour < 10 ? '0' + hour +':' : hour + ':'
        t = min < 10 ? '0' + min +':' : min + ':'
        if(sec < 10){
          t +=  + '0';
        }
        t += sec.toFixed(2);
      }
      //截取0-5 不包含:
      t = t.substring(0, t.length -3);
      return t;
    },

  }
}
</script>

<style scoped lang="less">
.search-item {
  width: 100%;
  .title {
    display: flex;
    align-items: baseline;
    border-bottom: 3px solid red;
    padding-bottom: 8px;
    h2 {
      font-size: 45px;
      margin-right: 20px;
      color:black;
    }
  };
  .recommend-song{
  li{
    width: 30%;
    display: flex;
    margin-bottom: 20px;
    .col-item{
      overflow: hidden;
      position: relative;
      width: 100%;
      img{
        width: 250px;
        height: 250px;
        border-radius: 10px;
      }
      span{
        width: 100%;
        display: inline-block;
      }
      .play-count{
        position: absolute;
        width: 100%;
        height: 29px;
        line-height: 29px;
        border-radius: 7px;
        background: rgba(0,0,0,.5);
        color:white;
        .play-count-left{
          position: absolute;
          left:10px;
        }
        .play-count-right{
          right:10px;
          position: absolute;
          i{
            margin-right: 5px;
          }
        }
      }
    }
  }
};
}
</style>