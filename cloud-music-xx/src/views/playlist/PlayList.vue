<template>
  <div class="play-list">
    <el-header class="header">
      <header-item :header-item="headerItem"></header-item>
    </el-header>
    <play-list-item :types="types" :playlists="playlists" @bar-click="barClick"
                    :categorise="categorise"
                    :total="total"
                    :all-types="allTypes"
                    @all-types-click="allTypesClick"
                    @playlists-count-click="playlistsCountClick"
                    @playlists-pages-click="playlistsPagesClick"
    ></play-list-item>
  </div>
</template>

<script>
import {playList,topPlayList} from "network/playList";

import headerItem from "./childComps/headerItem";
import PlayListItem from "./childComps/PlayListItem";
export default {
  name: "PlayList",
  components:{
    headerItem,
    PlayListItem
  },
  data(){
    return {
      headerItem:[],
      //全部歌曲
      categorise:{},
      //类型
      types:['全部','粤语','ACG','华语','流行','欧美','说唱','摇滚','民谣','电子','轻音乐','影视原声','怀旧'],
      //底部的数据
      playlists:[],
      //总条数
      total:0,
      //条数
      count:10,
      //页数
      pages:0,
      //默认的类型
      type:'全部',
      //subs全部歌曲中对应的类型
      subs:[],
      //全部歌曲中类型对应的值
      allTypes:[[],[],[],[],[]],
    }
  },
  created() {
    playList('catlist').then(res => {
      this.categorise=res.categories;
      // console.log(this.allMusic);
      console.log(res);
      this.subs=res.sub;
      this.subs.forEach((value, index, array) =>{
        if(value.category===0){
          this.allTypes[0].push(value.name);
          console.log(this.allTypes);
        }else if(value.category===1){
          this.allTypes[1].push(value.name);
        }else if(value.category===2){
          this.allTypes[2].push(value.name);
        }else if(value.category===3){
          this.allTypes[3].push(value.name);
        }else if(value.category===4){
          this.allTypes[4].push(value.name);
        }
      })

    })
    //顶部的数据
    topPlayList({'':'','limit':1,'cat':'全部'},'/highquality').then(res => {
      this.headerItem=res.playlists;
      // console.log(this.headerItem)
    });

    //底部的数据
    topPlayList({'offset':0,'limit':10,'cat':'全部'}).then(res => {
      this.playlists=res.playlists;
      this.total=res.total;
      // console.log(this.playlists)
    });
  },
  methods:{
    //点击之后切换数据
    barClick(types){
      this.type=types;
      //顶部的数据
      topPlayList({'':'','limit':1,'cat':this.type},'/highquality').then(res => {
        this.headerItem=res.playlists;
      });
      //底部的数据
      this.BottomPlayList()
    },
    //点击第几页切换第几页对应的数据
    playlistsCountClick(val){
      this.count=val;
      this.BottomPlayList()

    },
    //点击一页多少条数据,切换一页多少条数据
    playlistsPagesClick(val){
      this.pages=val;
      this.BottomPlayList()
    },

    allTypesClick(value){
      this.type=value;
      this.BottomPlayList();
    },

    BottomPlayList(){
      topPlayList({'offset': this.pages * this.count ,'limit':this.count,'cat':this.type}).then(res => {
        this.playlists=res.playlists;
        this.total=res.total;
      });
    }
  }


}
</script>

<style scoped lang="less">
.play-list{
  width: 100%;
  padding-right: 100px;
  .header{
    width: 100% !important;
    height: 200px !important;
    padding: 0 0 !important;
  }
}

.el-dropdown {
  vertical-align: bottom;
}
.text-button{
  color:black;
  background: #fff;
  border-color:#DCDFE6;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;

}

</style>