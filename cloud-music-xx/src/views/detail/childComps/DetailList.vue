<template>
  <div class="detail-list" v-if="Object.keys(listItem).length !== 0">
    <el-header class="header" v-for="item in listItem" :key="item.id">
      <div class="header-left">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="header-right">
        <div class="song-list">
          <span class="song-list-item">歌单</span>
          <span class="song-list-name">{{ item.name }}</span>
        </div>
        <div class="user-info">
          <img :src="item.creator.avatarUrl" alt="" />
          <span class="info-nickname">{{ item.creator.nickname }}</span>
          <span class="info-createTime"
            >{{ setTimes(item.createTime) }}创建</span
          >
        </div>
        <div class="play-songs">
          <span class="play" @click="playAllSongs" title="播放全部">
            <i class="el-icon-video-play"></i>
            播放全部
          </span>
          <span class="add-list" @click="addList" title="列表">
            <i class="el-icon-plus"></i>
          </span>
        </div>
        <div class="tag">
          标签:
          <span v-for="item in listItem.tags" :key="item.id">{{ item }}</span>
        </div>
        <div class="song">
          <span>歌曲: {{ item.trackCount }} </span>
          <span>播放: {{ item.playCount | playCount }}</span>
        </div>
        <div class="intro">
          简介:
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </el-header>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane :label="songTitle" name="first" class="music-list-item">
        <el-table
          :data="tableData"
          border
          style="width: 1018px"
          @row-click="rowClick"
        >
          <el-table-column
            prop="date"
            type="index"
            label="#"
            width="48"
            height="141"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="al.picUrl" label="#" width="150" height="141">
            <template slot-scope="scope">
              <img v-lazy="scope.row.al.picUrl" alt="" class="picUrl" />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐标题"
            width="205"
            height="141"
          >
          </el-table-column>
          <el-table-column
            prop="ar[0].name"
            label="歌手"
            width="205"
            height="141"
          >
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" width="205" height="141">
          </el-table-column>
          <el-table-column label="时长" width="205" height="141">
            <template slot-scope="scope">
              {{ FormatTime(scope.row.dt / 1000) }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="commentSub" name="second">
        <div class="comment">
          <textarea class="search"></textarea>
          <div class="hot-comment">
            <comment-info :hot-comment-info="hotCommentInfo">
              <template slot="hotTitle">
                <h2>精彩评论({{ hotCommentInfo.length }})</h2>
              </template>
              <template slot="hotComment"></template>
            </comment-info>
          </div>
          <div class="new-comment">
            <comment-info :new-comment-info="newCommentInfo">
              <template slot="newTitle">
                <h2>最新评论({{ newCommentInfo.length }})</h2>
              </template>
              <template slot="newComment"></template>
            </comment-info>
          </div>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[15, 30, 60, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="third">
        <ul class="user-avatar">
          <li class="avatar-item" v-for="item in subscribers" :key="item.id">
            <img v-lazy="item.avatarUrl" alt="" class="img-avatar" />
            <div class="avatar-right">
              <span>{{ item.nickname }}</span>
              <img :src="genderImg(item.gender)" alt="" />
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommentInfo from "components/content/commentInfo/CommentInfo";
export default {
  name: "DetailList",
  components: { CommentInfo },
  props: {
    listItem: {
      type: Array,
      default() {
        return [];
      },
    },
    subscribers: {
      type: Array,
      default() {
        return [];
      },
    },
    song: {
      type: Array,
      default() {
        return [];
      },
    },
    hotCommentInfo: {
      type: Array,
      default() {
        return [];
      },
    },
    newCommentInfo: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
    },
  },
  data() {
    return {
      formatTime: 0,
      activeName: "first",
      tableData: null,
      songTitle: "歌曲列表 (0)",
      listTitle: "",
      currentPage4: 1,
      songList: [],
      load: false,
    };
  },
  created() {
    setTimeout(() => {
      this.tableData = this.song;
      this.songTitle = `歌曲列表 (${this.tableData.length})`;
      //强制重新渲染页面
      // this.$forceUpdate();
    }, 3000);
  },
  methods: {
    //点击table
    handleClick(a, b) {},
    //点击行触发的
    rowClick(row, column, event) {
      this.songList.push(row);
      this.$emit("id-click", row);
    },
    handleSizeChange(val) {
      this.$emit("detail-count-click", val);
    },
    handleCurrentChange(val) {
      this.$emit("detail-pages-click", val - 1);
    },
    //添加全部歌曲,并且播放
    playAllSongs() {
      //请求播放的音乐
      this.$emit("play-all-song", this.song);
    },
    //添加全部歌曲到列表,不播放
    addList() {
      this.$emit("add-list-all-song", this.song);
    },
    FormatTime(times) {
      let t;
      if (times > -1) {
        var hour = Math.floor(times / 3600);
        var min = Math.floor(times / 60) % 60;
        var sec = times % 60;
        t = hour < 10 ? "0" + hour + ":" : hour + ":";
        t = min < 10 ? "0" + min + ":" : min + ":";
        if (sec < 10) {
          t += +"0";
        }
        t += sec.toFixed(2);
      }
      //截取0-5 不包含:
      t = t.substring(0, t.length - 3);
      console.log(times);
      return t;
    },
    //补零
    setZero(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
    setTimes(timer) {
      let time = new Date(timer);
      let year = time.getFullYear();
      let mon = this.setZero(time.getMonth() + 1);
      let day = this.setZero(time.getDay());
      let hour = this.setZero(time.getHours());
      let min = this.setZero(time.getMinutes());
      let sec = this.setZero(time.getSeconds());
      return year + "-" + mon + "-" + day + "-";
    },
  },
  computed: {
    commentSub() {
      return `评论列表(${this.total})`;
    },
    genderImg() {
      return function (gender) {
        if (gender === 0) {
          return require("assets/img/detail/xingbiewu.png");
        } else if (gender === 1) {
          return require("assets/img/detail/xingbienan.png");
        } else if (gender === 2) {
          return require("assets/img/detail/xingbienv.png");
        }
      };
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
.header {
  height: auto !important;
  display: flex;
  .header-left {
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }
  }
  .header-right {
    padding-left: 30px;
    color: black;
    font-size: 16px;
    .song-list {
      margin-top: 10px;
      font-weight: bold;
      .song-list-item {
        width: 54px;
        height: 32px;
        display: inline-block;
        border: 1px solid red;
        color: red;
        line-height: 32px;
        text-align: center;
        margin-right: 10px;
      }
      .song-list-name {
        color: black;
        font-size: 20px;
      }
    }
    .user-info {
      margin-top: 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .info-nickname {
        margin: 0 10px;
        color: skyblue;
      }
    }
    .play-songs {
      width: 150px;
      height: 40px;
      background: red;
      border-radius: 20px;
      line-height: 40px;
      margin: 10px 10px;
      color: white;
      .play {
        height: 100%;
        display: inline-block;
        padding-left: 20px;
        border-right: 1px solid white;
        padding-right: 10px;
      }
      .add-list {
        padding-left: 7px;
      }
    }

    .tag {
      margin-top: 10px;
      span {
        margin-right: 20px;
      }
    }
    .intro {
      .description {
        margin-top: 10px;
        color: #666666;
      }
    }
    .song {
      span {
        margin-right: 10px;
      }
    }
  }
}
.tabs {
  //收藏着
  .user-avatar {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 23%;
      margin: 10px 0;
      display: flex;
      align-items: center;
      span {
        width: 114px;
        display: inline-block;
      }
      .avatar-right {
        display: flex;
        flex-direction: column;
        img {
          width: 36px;
          height: 30px;
        }
      }
      .img-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 20px;
      }
    }
  }
  //评论列表
  .comment {
    textarea {
      margin-left: 20px;
      width: 974px;
      height: 148px;
    }
    .new-comment {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .user-info {
        width: 100%;
        display: flex;
        .user-info-left {
          img {
            width: 80px;
            border-radius: 50%;
            vertical-align: middle;
            padding: 10px;
          }
        }
        .user-info-right {
          width: 75%;
          padding: 10px;
          line-height: 25px;
          .comment-nickname {
            color: #517eaf;
          }
          span {
            margin: 0 5px;
            font-size: 16px;
          }
          .give {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .picUrl {
    height: 141px;
  }
}
</style>
