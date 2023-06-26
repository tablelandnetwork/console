const mix = require("laravel-mix");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env" });

const webpackConfig = {
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: false,
      path: false,
      fs: false,
      buffer: false,
      os: false,
      https: false,
      http: false,
      stream: false,
    },
  },
};

mix
  .setPublicPath("./public")
  .webpackConfig(webpackConfig)
  .sass("src/styles/style.scss", "public/styles")
  .ts("src/app/app.tsx", "public/js")
  .copy("node_modules/@urdeveloper/sql.js/dist/sql-wasm.wasm", "public/js")
  .copy("src/assets", "public/assets")
  .copy("src/app/index.html", "public")
  .react()
  .sourceMaps();