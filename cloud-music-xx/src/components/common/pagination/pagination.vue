<template>
  <div class="pagination">
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  methods: {
    handleSizeChange(val) {
      this.$emit('count-item-click',val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit('pages-item-click',val)
      console.log(`当前页: ${val}`);
    }
  },
  props:{
    pageSizes:{
      type:Array,
    },
    pageSize:{
      type:Number,
    },
    total:{
      type:Number,
    }
  },
  data() {
    return {
      currentPage4: 1,
    };
  }

}
</script>

<style scoped>
  .pagination{
    width: 700px;
    margin: 0 auto;
  }
</style>