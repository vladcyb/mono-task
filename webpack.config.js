const path = require('path')
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[contenthash].[name].js',
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: {
          import: './src/templates/index.html',
          data: {},
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
}
