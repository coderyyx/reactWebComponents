var path = require('path');
var webpack = require('webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
	  index : ['./index.js'],
      vendors :['react','react-dom']
  },
  output: { 
    path: path.join(__dirname, "demo/dist"),
    filename: '/js/[name].js'
  },
  resolve: {
        extensions: ['', '.js', '.jsx']
  },
  devtool:'eval-source-map',
  devServer:{
      historyApiFallback:true,
      hot:true,
      inline:true,
      progress:true,
      port:9090 
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/,loader: 'babel-loader',
        exclude: /node_modules/,
        query: {presets: ['es2015', 'stage-0','react']}
      },
      {
        test: /\.less$/,
        loader: "react-hot!style-loader!css-loader!less-loader"
      },
      {
        test: /\.css$/,
        loader: "react-hot!style-loader!css-loader",
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors','/js/vendors.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template : "demo/template/index.html",
      version : "1",
      inject : true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    })
    ,
    new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify("develop") 
      }
    })
  ]
};