const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].[hash].js',
        publicPath: '',
    clean: true,
  },
  mode: "production",
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: "img/[name].[hash][ext][query]"
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader"
        ],
      },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
  ]
 }