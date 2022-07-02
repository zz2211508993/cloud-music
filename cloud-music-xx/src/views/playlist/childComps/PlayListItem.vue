<template>
  <div class="play-list-item">
    <div class="song-list">
      <div class="all-song">
        <el-dropdown>
          <el-button type="primary">
            全部歌单<i class="el-icon-arrow-right" style="font-size: 18px"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <el-dropdown-item v-for="(item,index) in categorise" class="dropdown-menu-item">
              <ul class="all-song-type">
                <li>{{item}}</li>
                <li v-for="value in allTypes[index]" @click="allTypesItemClick(value)">
                  <span>{{value}}</span>
                </li>
              </ul>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <ul class="nav-bar">
        <li
            v-for="(item,index) in types"
            :class="{active: index === currentIndex}"
            @click="barItemClick(index)"
        >
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <music-list>
      <ul class="container">
        <li class="col" v-for="(item,index) in playlists">
          <div class="col-item" id="col-item" @click="itemClick(index)">
            <img :src="item.coverImgUrl" alt="">
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
    </music-list>
    <pagination :pageSizes="pageSizes" :total="total" :pageSize="pageSizes[0]"
                @count-item-click="countItemClick"
                @pages-item-click="pagesItemClick"

    ></pagination>
  </div>

</template>

<script>
import MusicList from "components/content/musiclist/MusicList";
import pagination from "components/common/pagination/pagination";
export default {
  name: "playlistItem",
  data(){
    return{
      currentIndex:0,
      currentPage4: 1,
      //页数
      pageSizes:[10,30,50,100],
    }
  },
  props:{
    types:{
      type:Array,
    },
    playlists:{
      type:Array,
    },
    total:{
      type:Number,
    },
    categorise:{
      type:Object,
      default(){
        return{};
      }
    },
    allTypes:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  components:{
    MusicList,
    pagination,
  },
  methods:{
    barItemClick(index){
      this.currentIndex=index
      //向父组件传递数据
      this.$emit('bar-click',this.types[index])
    },
    itemClick(index) {
      this.$router.push('detail/'+this.playlists[index].id)
    },
    countItemClick(val){
       this.$emit('playlists-count-click',val)
      },
    pagesItemClick(val){
        this.$emit('playlists-pages-click',val - 1)
      },
    allTypesItemClick(value){
      this.$emit('all-types-click',value);
    }
/*    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit('playlists-count-click',val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('playlists-pages-click',val - 1)
    }*/
  }
}
</script>

<style scoped lang="less">
.play-list-item{
  padding-left: 10px;
  .song-list{
    padding-top: 10px;
    display: flex;
    .nav-bar{
      display: flex;
      margin-left: 300px;
      flex:1;
      line-height: 44px;
      li{
        margin: 0 5px;
      }
      .active{
        span{
          color:red;
        }
      }
    }
  }
}

#col-item{
  img{
    width: 200px;
    height: 200px;
  }
  span{
    width: 200px;
  }
}
.col{
  width: 25%;
}
.container{
  justify-content: space-between !important;
}

.all-song-type{
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  li{
    margin: 10px 10px;
    span{
      padding: 5px 6px;
      border: 1px solid black;
    }
    &:hover{
      color:steelblue;
    }
    &:nth-child(1){
      border: none;
      &:hover{
        color:#606266;
      }
    }
  }
}
.el-dropdown {
  button{
    background: white;
    color:black;
    border:1px solid #dcdfe6;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}


.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background: white !important;
  color:#606266 !important;
}


</style>