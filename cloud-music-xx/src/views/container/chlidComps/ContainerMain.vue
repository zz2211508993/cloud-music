<template>
  <div class="main" >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ContainerMain",
}
</script>

<style scoped>
  .main{
    display: flex;
    flex:1;
    margin-top:80px;
  }
</style>