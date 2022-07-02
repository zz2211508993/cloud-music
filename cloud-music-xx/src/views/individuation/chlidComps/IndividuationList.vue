<template>
  <div class="individuation-list">
    <el-carousel
      :interval="4000"
      type="card"
      height="250px"
      class="carouse"
      indicator-position="none"
    >
      <el-carousel-item v-for="item in bannerItem" :key="item.id">
        <img v-lazy="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <music-list title="推荐歌单">
      <ul class="recommend-song">
        <li
          v-for="(item, index) in personalizedItem"
          @click="itemClick(index)"
          :key="item.id"
        >
          <div class="col-item">
            <img v-lazy="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </music-list>
    <music-mv title="独家放送" :exclusive="exclusive">
      <ul class="exclusive-mv">
        <li v-for="(item, index) in exclusive" :key="item.id">
          <div
            class="col-item"
            @click="exclusiveItemClick(index)"
            :key="item.id"
          >
            <img v-lazy="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </music-mv>
    <new-music title="最新音乐" :new-song="newSong"></new-music>
    <music-mv title="推荐MV" :recommendItem="recommendItem">
      <ul class="recommend-mv">
        <li
          class="col"
          :span="8"
          v-for="(item, index) in recommendItem"
          :key="item.id"
        >
          <div class="col-item" @click="recommendItemClick(index)">
            <img v-lazy="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
            <span>{{ item.artistName }}</span>
          </div>
        </li>
      </ul>
    </music-mv>
  </div>
</template>

<script>
import MusicList from "components/content/musiclist/MusicList";
import MusicMv from "components/content/musicmv/MusicMv";
import NewMusic from "./NewMusic";

import { detail } from "network/detail";
import { mv } from "network/mv";

export default {
  name: "IndividuationList",
  components: {
    NewMusic,
    MusicMv,
    MusicList,
  },
  data() {
    return {
      titles: ["独家放送", "推荐mv"],
      id: null,
      isShow: true,
    };
  },
  props: {
    bannerItem: {
      type: Array,
      default() {
        return [];
      },
    },
    //推荐歌单
    personalizedItem: {
      type: Array,
      default() {
        return [];
      },
    },
    //独家放送
    recommendItem: {
      type: Array,
      default() {
        return [];
      },
    },
    //推荐mv
    exclusive: {
      type: Array,
      default() {
        return [];
      },
    },
    //最新音乐
    newSong: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.id = this.personalizedItem[index].id;
      this.$router.push("detail/" + this.id);
      //详细信息的数据
      detail({ id: this.id }, "detail").then((res) => {
        console.log(res);
      });
    },
    //推荐mv
    recommendItemClick(index) {
      this.$emit("recommend-click", this.recommendItem[index]);
    },
    //独家放送
    exclusiveItemClick(index) {
      this.$emit("exclusive-click", this.exclusive[index]);
      console.log(this.exclusive);
    },

    a() {
      this.isShow = !this.isShow;
    },

    b() {
      this.isShow = !this.isShow;
    },
  },
  filters: {
    //过滤播放量
    playCount(count) {
      if (count < 10000) return count;
      return (count / 10000).toFixed() + "万";
    },
  },
};
</script>

<style scoped lang="less">
.individuation-list {
  margin-left: -20px;
  .recommend-song {
    li {
      width: 30%;
      display: flex;
      margin-bottom: 20px;
      .col-item {
        overflow: hidden;
        position: relative;
        width: 100%;
        img {
          width: 250px;
          height: 250px;
          border-radius: 10px;
        }
        span {
          width: 100%;
          display: inline-block;
        }
        .play-count {
          position: absolute;
          width: 100%;
          height: 29px;
          line-height: 29px;
          border-radius: 7px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          .play-count-left {
            position: absolute;
            left: 10px;
          }
          .play-count-right {
            right: 10px;
            position: absolute;
            i {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .exclusive-mv,
  .recommend-mv {
    display: flex;
    width: 100%;
    li {
      width: 30%;
      .col-item {
        width: 90%;
        img {
          width: 100%;
          height: 250px;
          border-radius: 10px;
        }
      }
    }
  }
  .carouse {
    width: 1130px;
    img {
      width: 560px;
      height: 250px;
      border-radius: 10px;
    }
  }
}
</style>
