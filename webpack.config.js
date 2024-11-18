const path = require('path')
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const cityCards = require('./src/assets/data/city-cards.json')

require('dotenv').config()

const { YANDEX_MAPS_TOKEN } = process.env

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[contenthash].[name].js',
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: {
          import: './src/templates/index.html',
          data: { cityCards },
        },
      },
      preprocessor: 'ejs',
    }),
    new CleanWebpackPlugin(),
    new ESLintWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
        resolve: {
          extensions: ['.ts'],
        },
      },
      {
        test: /\.(png|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(scss|css)$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
  externals: {
    '@yandex/ymaps3-types': [
      `promise new Promise((resolve) => {
            if (typeof ymaps3 !== 'undefined') {
              return ymaps3.ready.then(() => resolve(ymaps3));
            }

            const script = document.createElement('script');
            script.src = "https://api-maps.yandex.ru/v3/?apikey=${YANDEX_MAPS_TOKEN}&lang=ru_RU";
            script.onload = () => {
              ymaps3.ready.then(() => resolve(ymaps3));
            };
            document.head.appendChild(script);
          })`,
    ],
  },
}
