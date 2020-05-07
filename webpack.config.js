/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  console.log(env);
  return {
    //   mode: process.env.NODE_ENV === 'development' ? 'development' : 'production', // "production" | "development" | "none"
    mode: 'production', // "production" | "development" | "none"
    devtool: 'eval', // source-map   hidden-source-map
    entry: {
      main: './src/public/js/main.ts',
    },
    //   watch: true,
    target: 'node',
    output: {
      // publicPath: '',
      path: path.join(__dirname, './dist/public'),
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
          use: [
            /* devMode ? 'style-loader' : */
            //   'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
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
        //   {
        //     context: './views/',
        //     from: '**/*',
        //     to: './views',
        //   },
      ]),
    ],
  };
};
