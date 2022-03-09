const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app:"./src/index.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.tsx$/,
        use:["ts-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    // path: path.resolve(__dirname, "dist/"),
    // publicPath: "/dist/",
    // filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};