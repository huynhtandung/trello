const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = (props) => ({
  entry: [path.resolve(__dirname, './src/index.tsx'), 'babel-polyfill'],
  mode: props.NODE_ENV,
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@apis': path.resolve(__dirname, './src/apis'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@environments': path.resolve(__dirname, './src/environments'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@types': path.resolve(__dirname, './src/types'),
      '@socket': path.resolve(__dirname, './src/socket.ts')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
        loader: 'file-loader',
          options: {
            limit: 25000,
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.ejs'),
      inject: true,
      title: 'Trello',
      favicon: './src/assets/icons/favicon.svg'
    }),
    new Dotenv({
      path: path.resolve(
        __dirname,
        props.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production'
      ),
      safe: true,
      systemvars: false,
      silent: true,
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
})
