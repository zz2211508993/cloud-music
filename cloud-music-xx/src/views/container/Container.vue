<template>
  <el-container class="container">
    <el-header class="header-outer">
      <container-header></container-header>
    </el-header>
    <el-container class="container-inside">
      <el-aside style="width: 200px" v-show="value">
        <container-aside></container-aside>
      </el-aside>
      <el-main class="main">
        <container-main></container-main>
      </el-main>
    </el-container>

    <keep-alive>
      <aplayer
        :audio="audio"
        :lrcType="1"
        :list="true"
        fixed="fixed"
        @listAdd="handleEvent"
        @listSwitch="SwitchClick"
        v-if="playmusic.lrc"
        ref="aplayer"
      >
      </aplayer>
      <aplayer :audio="audios" :lrcType="1" fixed="fixed" v-else> </aplayer>
    </keep-alive>
  </el-container>
</template>

<script>
import ContainerHeader from "./chlidComps/ContainerHeader";
import ContainerInside from "./chlidComps/ContainerInside";
import ContainerAside from "./chlidComps/ContainerAside";
import ContainerMain from "./chlidComps/ContainerMain";

import { playMusic } from "network/detail";
import { songDetail } from "../../network/detail";

export default {
  name: "container",
  components: {
    ContainerMain,
    ContainerAside,
    ContainerHeader,
    ContainerInside,
  },
  data() {
    return {
      value: true,
      //当前播放音乐的地址
      audio: [],
      //默认显示的
      audios: {
        name: "东西（Cover：林俊呈）",
        artist: "纳豆",
        url: "https://cdn.moefe.org/music/mp3/thing.mp3",
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: "https://cdn.moefe.org/music/lrc/thing.lrc",
      },
      playmusic: function () {},
      audioList: [],
      data: {},
      //
      num: 0,
    };
  },
  created() {
    //接收用户传进来的歌曲
    this.$bus.$on("play-song", (res, song, lyric) => {
      this.playmusic = new playMusic(res.data[0].url, song, lyric);
      //通过这个Object.assign 进行深拷贝，就不会指向里面的内存地址了，直接复制
      let data = Object.assign({}, this.playmusic);
      //判断歌曲是否重复点击
      this.isAddSongLast(data);
    });

    //接收传过来的全部歌曲
    this.$bus.$on("play-all-music", (res, song, lyric, allSong) => {
      this.playmusic = new playMusic(res.data[0].url, song, lyric);
      let data = Object.assign({}, this.playmusic);
      //判断歌曲是否重复点击
      this.isAddSongFirst(data, allSong);
    });
    //接收传递过来的歌曲列表
    this.$bus.$on("list-music", (res, song, lyric, allSong) => {
      this.playmusic = new playMusic(res.data[0].url, song, lyric);
      let data = Object.assign({}, this.playmusic);
      //判断歌曲是否重复点击
      this.isAddSongFirst(data);
    });

    this.$bus.$on("music-click", (value) => {
      this.value = value;
    });

    this.$bus.$on("sidebar-click", (value) => {
      this.value = value;
    });

    //在页面加载时读取sessionStorage里的状态信息
    this.saveVuexStateDate();
  },

  destroyed() {},
  mounted() {},
  methods: {
    //将vuex的数据保存到浏览器中,刷新页面还在
    saveVuexStateDate() {
      if (sessionStorage.getItem("store")) {
        //replaceState更新state对象
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });
    },
    //判断当前音乐是否重复点击
    isAddSongLast(data) {
      //是长度是空就是还没有数据
      if (this.audio.length === 0) {
        //直接添加
        this.audio.push(data);
      } else {
        for (let i = 0; i < this.audio.length; i++) {
          //如果和之前点击的一样
          if (this.audio[i].id === data.id) {
            //根据当前点击的歌曲名字播放对应的歌曲
            this.$refs.aplayer.switch(this.audio[i].name);
            //返回不执行后面的语句
            return false;
          }
        }
        this.audio.push(data);
        //通过this.$nextTick等到所有结束在拿到,aplayer根据id播放音乐
        this.$nextTick(() => {
          if (this.$refs.aplayer.switch) {
            this.$refs.aplayer.switch(this.audio[this.audio.length - 1].id);
          } else {
            return false;
          }
        });
      }
    },
    isAddSongFirst(data, allSong) {
      //是长度是空就是还没有数据
      if (this.audio.length === 0) {
        //直接添加
        console.log(data);
        this.audio.push(data);
      } else {
        for (let i = 0; i < this.audio.length; i++) {
          //如果和之前点击的一样
          if (this.audio[i].id === data.id) {
            //根据当前点击的歌曲名字播放对应的歌曲
            this.$refs.aplayer.switch(this.audio[i].name);
            //返回不执行后面的语句
            return false;
          }
        }
        this.audio.push(data);
        //没有传就是不播放
        if (allSong) {
          if (this.audio.length === allSong.length) {
            this.$refs.aplayer.play(this.audio[0].id);
          }
        }
        //通过this.$nextTick等到所有结束在拿到,aplayer根据id播放音乐
      }
    },
    handleEvent() {},
    SwitchClick() {},
  },
};
</script>

<style lang="less">
.header-outer {
  border-bottom: 1px solid red;
  height: 50px !important;
  padding: 0 10px !important;
  position: fixed;
  width: 100%;
  z-index: 99;
  background: white;
}
.container-inside {
  display: flex;
}
.main {
  padding-left: 100px;
}

//音频的css样式
//音频fixed定位
.aplayer.aplayer-fixed .aplayer-body {
  width: 100% !important;
  max-width: 100% !important;
}
//歌词
.aplayer.aplayer-fixed .aplayer-lrc {
  z-index: 1111 !important;
  bottom: 24px !important;
}
.aplayer {
  width: 100%;
  margin-bottom: 40px;
  .aplayer-body {
    width: 100% !important;
  }
}
//图片的大小
.img-bg {
  width: 200px;
  height: 207px;
  background: rgba(128, 0, 128, 0.5);
  position: absolute;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: white;
  }
}
</style>
