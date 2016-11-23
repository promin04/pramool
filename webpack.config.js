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
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
          },
          { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=300000' }
        ]
      },
    devtool: 'source-map'
  }
