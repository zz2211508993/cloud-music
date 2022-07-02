<template>
    <div class="mv-item">
      <nav-bar>
        <nav-bar-item class="nav-bar-item">
          <template slot="area">
            <ul class="area">
              <li>
                地区:
              </li>
              <li v-for="(item,index) in area"
                  :class="{active:areaIndex === index}"
                  @click="areaClick(index)"
                  :key="item.id"
              >
                <span>{{item}}</span>
              </li>
            </ul>
          </template>
        </nav-bar-item>
      </nav-bar>
      <nav-bar>
        <nav-bar-item>
          <template slot="type">
          <ul class="area">
            <li>
              类型:
            </li>
            <li v-for="(item,index) in type"
                :class="{active:typeIndex === index}"
                @click="typeClick(index)"
                :key="item.id"
            >
              <span>{{item}}</span>
            </li>
          </ul>
        </template>
        </nav-bar-item>
      </nav-bar>
      <nav-bar>
        <nav-bar-item>
          <template slot="sort">
            <ul class="area">
              <li>
                排序:
              </li>
              <li v-for="(item,index) in sort"
                  :class="{active:sortIndex === index}"
                  @click="sortClick(index)"
                  :key="item.id"
              >
                <span>{{item}}</span>
              </li>
            </ul>
          </template>
        </nav-bar-item>
      </nav-bar>
      <music-mv title="">
        <el-row class="row">
          <el-col class="col" :span="6" v-for="(item,index) in mvItem" @click.native="mvItemClick(index)" :key="item.id">
            <div class="col-item">
              <img v-lazy="item.cover" alt="">
              <span>{{item.name}}</span>
              <span>{{item.artists[0].name}}</span>
            </div>
          </el-col>
        </el-row>
      </music-mv>
    </div>
</template>

<script>
import Type from "components/content/type/Type";
import navBar from "components/content/navbar/navBar";
import NavBarItem from "components/content/navbar/childComps/navBarItem";
import MusicMv from "components/content/musicmv/MusicMv";
export default {
  name: "MvItem",
  components:{
    MusicMv,
    navBar,
    NavBarItem,
    Type,
  },
  props:{
    mvItem:{
      type:Array,
    }
  },
  data(){
    return{
      area:['全部','内地','港台','欧美','日本','韩国'],
      type:['全部','官方版','原生','现场版','网易出品'],
      sort:['上升最快','最热','最新'],
      areaIndex:0,
      typeIndex:0,
      sortIndex:1,
      areaItem:null,
      typeItem:null,
      sortItem:null,
    }
  },
  created() {
    this.areaItem=this.area[this.areaIndex];
    this.typeItem=this.type[this.typeIndex];
    this.sortItem=this.sort[this.sortIndex];
  },
  methods:{
    //地区的点击事件
    areaClick(index){
      this.areaIndex=index;
      //areaItem保存点击地区的信息
      this.areaItem=this.area[this.areaIndex];
      //发送地区的信息给sing组件
      this.$emit('area-item-click',this.areaItem)
    },
    //类型的点击事件
    typeClick(index){
      this.typeIndex=index;
      this.typeItem=this.type[this.typeIndex];
      this.$emit('type-item-click',this.typeItem)
    },
    //排序的点击事件
    sortClick(index){
      this.sortIndex=index;
      this.sortItem=this.sort[this.sortIndex];
      this.$emit('sort-item-click',this.sortItem)
    },
    //mvItem的点击
    mvItemClick(index){
      this.$router.push('mvdetail/'+this.mvItem[index].id);
    }

  }
}
</script>

<style lang="less" scoped>
.active{
  color:red
}
.row{
  justify-content: space-evenly;
}
.col-item{
  img{
    height: 147px !important;
  }
}
.nav-bar-item{
  color:black;
}

</style>