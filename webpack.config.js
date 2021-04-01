const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 入口文件
  entry: './src/index.ts',

  // 打包目录
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包文件目录
    filename: 'bundle.js', // 打包文件名称
    environment: {
      arrowFunction: false, // 关闭箭头函数
      const: false // 不使用const
    }
  },

  // optimization: {
  //   minimize: false // 关闭代码压缩
  // },

  // 热更新
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },


  module: {
    rules: [
      // 处理 typescript
      {
        test: /\.ts$/,
        use: [
          // 配置 babel 兼容低版本浏览器
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', // 指定环境插件
                  {
                    targets: '> 0.25%, not dead', // 浏览器兼容版本
                    corejs: '3', // corejs 版本
                    useBuiltIns: 'usage' // 按需加载
                  }
                ]
              ]
            }
          },
          // 配置 typescript 转为 JavaScript
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/ // 不需要处理文件
      },
      // 处理 less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],

  // 设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
};
