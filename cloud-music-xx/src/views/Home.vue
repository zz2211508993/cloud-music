<template>
  <div class="home">
    <container></container>
  </div>
</template>

<script>
import Container from "./container/Container";

export default {
  name: 'Home',
  components: {
    Container,
  },
}

</script>

<style lang="less">
  .home{
    .container-header{
      height: 50px !important;
    }
  }

</style>
