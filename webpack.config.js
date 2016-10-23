var webpack = require('webpack');

module.exports = {
    entry: [
      'script!jquery/dist/jquery.min.js',
      './public/bin/src/app.js'
    ],
    externals:{
      jquery:'jQuery'
    },
    output: {
        path: './public/bin',
        filename: 'bundle.js',
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          moment: "moment"
      })

    ],
    devtool: 'source-map'
  }
