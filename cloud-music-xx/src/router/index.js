import Vue from "vue";
import VueRouter from "vue-router";
//路由跳转增加进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Home from "views/Home.vue";
const Individuation = () => import("views/individuation/Individuation");
const PlayList = () => import("views/playlist/PlayList");
const Songs = () => import("views/songs/Songs");
const MV = () => import("views/mv/MV");
const LeaderBoard = () => import("../views/leaderboard/LeaderBoard");
const Singer = () => import("views/singer/Singer");
const Detail = () => import("views/detail/Detail");
const MvDetail = () => import("views/mvdetail/MvDetail");
const SingerDetail = () => import("views/singerdetail/SingerDetail");
const SingerLeaderBoard = () =>
    import("views/singerleaderboard/SingerLeaderBoard");
const Search = () => import("views/search/search");
////路由跳转增加进度条
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "default",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/home",
                name: "individuation",
                redirect: "/home/individuation",
            },
            {
                path: "individuation",
                name: "Individuation",
                component: Individuation,
            },
            {
                path: "playlist",
                name: "PlayList",
                component: PlayList,
            },
            {
                path: "songs",
                name: "Songs",
                component: Songs,
            },
            {
                path: "leaderBoard",
                name: "LeaderBoard",
                component: LeaderBoard,
            },
            {
                path: "mv",
                name: "MV",
                component: MV,
            },
            {
                path: "singer",
                name: "Singer",
                component: Singer,
            },

            {
                path: "detail/:id",
                name: "Detail",
                component: Detail,
            },
            {
                name: "MVDetail",
                path: "mvdetail/:id",
                component: MvDetail,
            },
            {
                name: "SingerDetail",
                path: "singdetail",
                component: SingerDetail,
            },
            {
                path: "singerleaderboard",
                name: "SingerLeaderBoard",
                component: SingerLeaderBoard,
            },
            {
                path: "search/:keywords",
                name: "Search",
                component: Search,
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
