const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    popup: './src/popup.js',
    vocabify: './src/vocabify.js'
  },
  devtool: false,
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './src/css', to: 'css' },
      { from: './src/images', to: 'images' },
      { from: './src/webfonts', to: 'webfonts' },
      { from: './src/manifest.json', to: './' }
    ]),
    new HtmlWebpackPlugin({
        filename: 'vocabify.html', 
        template: 'src/vocabify.html',
        excludeChunks: [
            'background',
            'content',
            'popup' 
        ]
    }),
    new HtmlWebpackPlugin({ 
        filename: 'popup.html',
        template: 'src/popup.html',
        excludeChunks: [
            'background',
            'content',
            'vocabify' 
        ]
    })
  ]
};
