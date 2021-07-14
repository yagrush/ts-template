const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { default: ImageminWebpackPlugin } = require("imagemin-webpack-plugin");
const ImageminMozjpeg = require('imagemin-mozjpeg');
// const environment = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
module.exports = {
  devServer: {
    open: true,//ブラウザを自動で開く
    openPage: "",//自動で指定したページを開く
    // contentBase: path.join(__dirname, 'public'),// HTML等コンテンツのルートディレクトリ
    // watchContentBase: true,//コンテンツの変更監視をする
    port: 8088, // ポート番号
  },
  mode: process.env.NODE_ENV,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test:/\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader"
          },
        ],
      },
      {
        test:/\.(ts|tsx)$/,
        use: [
          {
            loader: "tslint-loader",
            options: {
              typeCheck: true,
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin(
      {
        template: "./src/index.html"
      }
    ),
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
      ],
    }),
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-80'
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256
      },
      svgo: {
      },
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true
        })
      ]
    })
  ],
  resolve: {
    extensions: [
      ".ts"
      ,".js"
      ,".tsx"
    ],
  }
};
