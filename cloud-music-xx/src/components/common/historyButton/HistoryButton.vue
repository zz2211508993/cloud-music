<template>
    <div class="history-button">
      <slot name="button-left">
          <i class="button-left el-icon-arrow-left"></i>
      </slot>
      <slot name="button-right">
        <i class='button-right el-icon-arrow-right'></i>

      </slot>
    </div>
</template>

<script>
export default {
  name: "HistoryButton"
}

</script>

<style scoped lang="less">
  .history-button{
    display: flex;
    margin-top: 5px;
    .button-left,.button-right{
      width:24px;
      height: 24px;
      background: rgba(0,0,0,0.5);
      display: inline-block;
      line-height: 24px;
      border-radius: 50%;
      font-size: 12px;
      margin-left:10px;
      color:white;
    }
  }
</style>