const mix = require('laravel-mix');
const webpack = require('webpack');

const webpackConfig = {
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ],
  module: {
    rules: [
      {
        resolve: {
            fullySpecified: false
        }
      }
    ]
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
      stream: false
    }
}};

mix
  .setPublicPath("./dist/public")
  .webpackConfig(webpackConfig)
  .sass("src/styles/style.scss", "public/styles")
  .ts('src/app/app.js', 'public/js')
  .copy('node_modules/@urdeveloper/sql.js/dist/sql-wasm.wasm', 'dist/public/js')
  .copy('src/assets', 'dist/public/assets')
  .copy('src/app/index.html', 'dist/public')
  .react()
  .sourceMaps();
