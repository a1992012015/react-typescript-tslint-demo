// const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const {override, fixBabelImports, addLessLoader, addWebpackAlias} = require("customize-cra");
const apiMocker = require("mocker-api");
const path = require("path");

/* config-overrides-overrides.js */
module.exports = {
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      config.before = (app) => {
        apiMocker(app, path.resolve(__dirname, "mockers/index.js"), {
          // proxy: {
          //   "/api/*": "https://prod-tftv-mall.tokenpad.io"
          // },
          changeHost: true,
        });
      };

      return config;
    };
  },
  webpack: function(config, env) {
    // 添加模块热更新
    // config = rewireReactHotLoader(config, env);

    const option = [
      // 按需加载
      fixBabelImports("import", {
        libraryDirectory: "es",
        libraryName: "antd",
        style: true, // change importing css to less
      }),
      // 自定义主题加载less
      addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#2EAEF1",
        },
      }),
      // 设置路径
      addWebpackAlias({
        "@": path.resolve(__dirname, "src"),
      }),
    ];

    return override(...option)(config, env);
  },
};
