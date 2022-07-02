<template>
  <div class="song-item">
    <type
        :types="types" class="type" ref="type"
        @song-item-click="songItemClick"
        @click.native="songItemClick1"
    ></type>
    <el-table
        :data="song"
        border
        style="width: 1018px">
      <el-table-column
          prop="date"
          type="index"
          label="#"
          width="48"
          height="141"
      >
        <template slot-scope="scope">
          {{scope.$index +1}}
        </template>
      </el-table-column>
      <el-table-column
          prop="album"
          label="#"
          width="150"
          height="141"
      >
        <template slot-scope="scope">
          <img v-lazy="scope.row.album.picUrl" alt="" class="picUrl">
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="音乐标题"
          width="205"
          height="141"
      >
      </el-table-column>
      <el-table-column
          prop="album.artists[0].name"
          label="歌手"
          width="205"
          height="141"
      >
      </el-table-column>
      <el-table-column
          prop="album.name"
          label="专辑"
          width="205"
          height="141"
      >

      </el-table-column>
      <el-table-column
          label="时长"
          width="205"
          height="141"

      >
        <template slot-scope="scope">
          {{FormatTime(scope.row.duration /1000)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Type from "components/content/type/Type";
export default {
  name: "SongItem",
  components:{
    Type,
  },
  props:{
    types:{
      type:Array,
      default(){
        return[];
      }
    },
    song:{
      type:Array,
      default(){
        return[];
      }
    },
  },
  data(){
    return{
      loadData:null,
    }
  },
  created() {

  },
  methods:{
      songItemClick(loadData){
        this.loadData=loadData
      },
      songItemClick1() {
      this.$emit('song-click',this.loadData)
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
    }
  },

}
</script>

<style scoped>
.picUrl{
  width: 100px;
  height: 100px;
}

.type{
  margin-bottom: 25px;
}

</style>