const rewireReactHotLoader = require('react-app-rewire-hot-loader');

/* config-overrides.js */
module.exports = function override(config, env) {
   
    console.log(" before config",  env);
    // see https://github.com/gaearon/react-hot-loader#react--dom
    config.entry = ['react-hot-loader/patch', './src/index.js'];
    config.devServer = {
        hot: true
    };
    config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom': '@hot-loader/react-dom'
    }
    config = rewireReactHotLoader(config, env);
    return config;
}