<template>
  <div class="singer-leader-boardItem">
    <h2>云歌手榜</h2>
    <nav-bar>
      <nav-bar-item>
        <template slot="area">
          <ul class="area">
            <li v-for="(item,index) in area"
                :class="{active:areaIndex === index}"
                @click="areaItemClick(index)"
                :key="item.id"
            >
              <span>{{item}}</span>
            </li>
          </ul>
        </template>
      </nav-bar-item>
    </nav-bar>
    <artist-leader-board :artists="artists"></artist-leader-board>

  </div>
</template>

<script>
import NavBar from "components/content/navbar/navBar";
import navBarItem from "components/content/navbar/childComps/navBarItem";
import artistLeaderBoard from "./artistLeaderBoard";
export default {
  name: "SingerLeaderBoardItem",
  components: {NavBar,navBarItem,artistLeaderBoard},
  data(){
    return {
      area:['华语','欧美','韩国','日本'],
      areaIndex:0,
    }
  },
  props:{
    artists:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  methods:{
    areaItemClick(index){
      this.areaIndex=index;
      this.$emit('area-click',index + 1);
    }
  }
}
</script>

<style scoped>
</style>