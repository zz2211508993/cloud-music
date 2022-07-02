<template>
  <div class="ranking">
    <ul class="ranking-item" v-for="(item,index) in ranking">
      <li @click="imgClick(index)">
        <img v-lazy="list[index].coverImgUrl" alt="">
      </li>
      <li v-for="(value,index) in item">
        <div><span>{{index + 1}} .   {{value.name}} ({{value.alia[0]}})</span></div>
        <span>{{value.ar[0].name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RangKing",
  props:{
    list:{
      type:Array,
    },
    ranking:{
      type:Array,
    }
  },

  methods:{
    imgClick(index){
      this.$router.push('detail/'+this.list[index].id)
    }
  }


}
</script>

<style scoped lang="less">
.ranking{
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 85%;
      display: flex;
      line-height: 40px;
      padding-left: 25px;
      justify-content: space-between;
      &:last-child{
        margin-bottom: 20px;
      }
      span{
        font-size: 17px;
        color:black;
      }
      &:nth-child(1){
        padding: 0;
      }
      img{
        width: 200px;
        height: 200px;
      }
    }
  }

}

</style>