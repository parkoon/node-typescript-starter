/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({ NODE_ENV }) => {
  console.log(NODE_ENV);
  const isDev = NODE_ENV === 'development';
  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval' : 'source-map',
    entry: {
      main: './src/public/js/main.ts',
    },
    target: 'node',
    output: {
      // publicPath: '',
      path: path.join(__dirname, './build/public'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][hash].[ext]',
                limit: 10 * 1024, // 10kb,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.scss', '.css'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
      }),

      new CopyWebpackPlugin([
        {
          context: './src/public/resources/',
          from: '**/*',
          to: './resources',
        },
        {
          context: './views/',
          from: '**/*',
          to: './views',
        },
      ]),
    ],
  };
};
