module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //@代表src
        views: "@/views",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        assets: "@/assets",
      },
    },
  },
};
