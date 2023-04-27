const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'html-loader',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {minimize: true},
        },
      ],
    },
  ],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  },
  target: 'web', // add this line to set target to web instead of node
  resolve: {
    fallback: {
      https: require.resolve('https-browserify'),
      querystring: require.resolve("querystring-es3"),
      url: require.resolve("url/"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};