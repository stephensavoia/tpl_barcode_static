const path = require("path");

module.exports = {
  mode: "production", // or 'production' or 'none'
  entry: "./src/js/script.js", // Adjust the path to your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
