<template>
    <ul class="type">
          <li
              class="type-item" v-for="(item,index) in types" @click="typeClick(index)"
              :class="{active:index === currentIndex}"
          >
          <span>
            {{item}}
          </span>
          </li>
    </ul>
</template>

<script>
export default {
  name: "Type",
  data(){
    return{
      currentIndex:0,
      typeNumber:0,
      number:0,
    }
  },
  props:{
    types:{
      type:Array,
      default(){
      }
    },
  },
  methods:{
    typeClick(index){
      this.currentIndex=index;
      switch(this.currentIndex){
        case 0:
           this.typeNumber=0
          break;
        case 1:
          this.typeNumber=7
          break;
        case 2:
          this.typeNumber=96
          break;
        case 3:
          this.typeNumber=8
          break;
        case 4:
          this.typeNumber=16
          break;
      }
      this.$emit('song-item-click',this.typeNumber);
    }
  },
}
</script>

<style scoped lang="less">
.type{
  margin-top: 20px;
  width: 100%;
  display: flex;
  .type-item{
    width: 70px;
  }
  .active span{
    color:red;
  }
}
</style>