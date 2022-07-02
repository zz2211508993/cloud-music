<template>
  <div class="nav-bar-item">
    <slot name="area">
    </slot>
    <slot name="type">
    </slot>
    <slot name="sort">
    </slot>
  </div>
</template>

<script>
export default {
  name: "navBarItem",
  data(){
    return{

    }
  },
  methods:{
  }
}

</script>

<style scoped lang="less">
 .nav-bar-item{
   ul{
     display: flex;
     justify-content: left;
     li{
       margin-right: 40px;
       line-height:40px;
     }
   }
 }
 .active{
   color:red;
 }

</style>