<template>
  <div class="new-music">
    <div class="music-list">
      <p>{{ title }}></p>
      <el-row class="row">
        <el-col class="col" v-for="item in newSong" :span="12" :key="item.id">
          <div class="col-item">
            <img :src="item.picUrl" alt="" />
            <div class="text">
              <span>{{ item.name }}</span>
              <span v-for="value in item.song.artists" :key="value.id">{{
                value.name
              }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusic",
  props: {
    newSong: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
    },
  },
};
</script>

<style scoped lang="less">
.new-music {
  .music-list {
    margin-bottom: 30px;
    p {
      font-size: 20px;
      color: black;
      font-weight: bold;
    }
    .row {
      display: flex;
      flex-wrap: wrap;

      .col {
        .col-item {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          margin-top: 20px;
          .text {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
            span {
              width: 100%;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              line-height: 35px;
            }
          }
          img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
