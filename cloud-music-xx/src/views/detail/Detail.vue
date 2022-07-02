<template>
  <div class="detail">
    <detail-list
      :listItem="listItem"
      :subscribers="subscribers"
      :hot-comment-info="hotCommentInfo"
      :new-comment-info="newCommentInfo"
      :total="total"
      @detail-pages-click="detailPagesClick"
      @detail-count-click="detailCountClick"
      @id-click="idClick"
      @play-all-song="playAllSong"
      @add-list-all-song="addListAllSong"
      :song="song"
    ></detail-list>
  </div>
</template>

<script>
import DetailList from "./childComps/DetailList";
import { detail, comment, songDetail, playSong } from "network/detail";
import { lyric } from "network/lyric";
import NProgress from "nprogress";
import { playMusic } from "../../network/detail";
export default {
  name: "Detail",
  components: { DetailList },
  data() {
    return {
      id: 0,
      listItem: [],
      song: [],
      subscribers: [],
      newCommentInfo: [],
      hotCommentInfo: [],
      trackIds: [],
      trackItem: [],
      ids: "",
      //总条数
      total: 0,
      //一页显示的数量
      limit: 15,

      //偏移量
      offset: 0,
      //歌词
      lyric: "",

      removeid: [],
    };
  },
  created() {
    scrollTo(0, 0);
    //header的内容
    this.id = this.$route.params.id;
    //歌曲列表
    detail({ id: this.id }, "detail").then((res) => {
      //顶部的信息
      this.listItem.push(res.playlist);
      //保存着歌曲列表信息
      this.trackIds = this.listItem[0].trackIds;
      //取出歌曲列表的信息,中保存的id
      for (let item of this.trackIds) {
        this.trackItem.push(item.id);
        this.ids = this.trackItem.join();
      }
      //歌曲详情
      songDetail({ ids: this.ids }).then((res) => {
        //歌曲
        this.song = res.songs;
      });
      //根据歌曲列表信息的ids取出对应的数据
    });
    //评论的信息
    comment({ id: this.id, type: 2, limit: 15, offset: 0 }).then((res) => {
      this.hotCommentInfo = res.hotComments;
      this.newCommentInfo = res.comments;
      this.total = res.total;
    });
    //收藏者
    detail({ id: this.id, limit: 200 }, "subscribers").then((res) => {
      this.subscribers = res.subscribers;
    });
  },
  methods: {
    idClick(load) {
      //根据id拿到歌词,并且拿到根据id播放音乐
      lyric({ id: load.id }).then((res) => {
        //播放音乐的
        playSong({ id: load.id }).then((result) => {
          //歌词
          this.lyric = res.lrc.lyric;
          this.$bus.$emit("play-song", result, load, this.lyric);
        });
      });
    },
    //拿到所有播放的音乐的数据
    playAllSong(song) {
      this.listSong(song, "play-all-music");
    },

    //列表展示，一开始不播放
    addListAllSong(song) {
      //取出song中的所有id
      this.listSong(song, "list-music");
    },
    //点击一页多少就切换一页多少
    detailCountClick(val) {
      this.limit = val;
      //评论信息
      comment({
        id: this.id,
        type: 2,
        limit: this.limit,
        offset: this.offset * this.limit,
      }).then((res) => {
        this.hotCommentInfo = res.hotComments;
        this.newCommentInfo = res.comments;
        this.total = res.total;
      });
    },
    //点击详情页的
    detailPagesClick(val) {
      this.offset = val;
      comment({
        id: this.id,
        type: 2,
        limit: this.limit,
        offset: this.offset * this.limit,
      }).then((res) => {
        this.hotCommentInfo = res.hotComments;
        this.newCommentInfo = res.comments;
        this.total = res.total;
      });
    },
    //传递的事件总线的名字
    async listSong(song, name) {
      //取出song中的所有id
      for (let i = 0; i < song.length; i++) {
        //拿到异步中的数据，按照顺序
        await lyric({ id: song[i].id }).then((res) => {
          playSong({ id: song[i].id }).then((result) => {
            this.lyric = res.lrc.lyric;
            this.$bus.$emit(`${name}`, result, song[i], this.lyric, song);
          });
        });
      }
    },
  },

  /*  watch:{
    song(newValue){
      this.song=newValue;
      //拿到数据最新数据之后强制刷新
      this.$forceUpdate();
    }
  }*/
};
</script>

<style scoped></style>
