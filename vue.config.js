module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_index.scss";`
      }
    }
  },

  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  },

  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();
    svgRule.use("svg-sprite-loader").loader("svg-sprite-loader");
  }
};
