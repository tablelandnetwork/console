const mix = require('laravel-mix');

const webpackConfig = {
  resolve: {
    fallback: {
      crypto: false,
      path: false,
      fs: false
    }
}};

mix
  .setPublicPath("./dist/public")
  .webpackConfig(webpackConfig)
  .sass("src/styles/style.scss", "public/styles")
  .js('src/app/app.js', 'public/js')
  .copy('node_modules/@jlongster/sql.js/dist/sql-wasm.wasm', 'dist/public/js')
  .copy('src/assets', 'dist/public/assets')
  .copy('src/app/index.html', 'dist/public')
  .react()
  .sourceMaps();

