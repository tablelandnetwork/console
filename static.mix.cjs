const mix = require("laravel-mix");

const webpackConfig = {
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
    },
  },
};

mix
  .setPublicPath("./dist/static")
  .webpackConfig(webpackConfig)
  .sass("src/styles/style.scss", "static/styles")
  .js("src/app/anim.js", "static/js/app.js")
  .copy("src/app/anim.html", "dist/static/index.html")
  .copy("src/assets", "dist/static/assets")
  .react()
  .sourceMaps();
