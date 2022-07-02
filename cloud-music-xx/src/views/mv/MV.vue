<template>
  <div class="mv">
    <mv-item
      :mv-item="mvItem"
      @area-item-click="areaItemClick"
      @type-item-click="typeItemClick"
      @sort-item-click="sortItemClick"
    ></mv-item>
  </div>
</template>

<script>
import MvItem from "./childComps/MvItem";
import { mv } from "../../network/mv";
export default {
  name: "MV",
  components: {
    MvItem,
  },
  data() {
    return {
      mvItem: null,
      areaItem: null,
      typeItem: null,
      sortItem: null,
    };
  },
  created() {},
  mounted() {
    mv({
      area: this.areaItem || "全部",
      type: this.typeItem || "全部",
      order: this.sortItem || "最热",
      limit: 8,
      offset: 0,
      total: 0,
      num: 1,
    }).then((res) => {
      this.mvItem = res.data;
    });
  },
  methods: {
    areaItemClick(load) {
      this.areaItem = load;
      this.mvAxios();
    },
    typeItemClick(load) {
      this.typeItem = load;
      this.mvAxios();
    },
    sortItemClick(load) {
      this.sortItem = load;
      this.mvAxios();
    },
    mvAxios() {
      mv({
        area: this.areaItem || "全部",
        type: this.typeItem || "全部",
        order: this.sortItem || "最热",
        limit: 8,
        offset: 1,
        total: 5000,
        num: 1,
      }).then((res) => {
        this.mvItem = res.data;
      });
    },
  },
};
</script>

<style scoped></style>
