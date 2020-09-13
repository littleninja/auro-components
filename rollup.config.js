const merge = require("deepmerge");
const { createBasicConfig } = require("@open-wc/building-rollup");
const postcss = require("rollup-plugin-postcss");
const autoprefixer = require("autoprefixer");
const postcssCustomProperties = require("postcss-custom-properties");
const comments = require("postcss-discard-comments");

const baseConfig = createBasicConfig({
  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === "true",

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  input: `src/${process.env.LERNA_PACKAGE_NAME}.js`,
  plugins: [
    // inject css modules
    postcss({
      extensions: [".css", ".scss"],
      autoModules: true,
      modules: true,
      plugins: [autoprefixer, postcssCustomProperties, comments],
    }),
  ],
  output: {
    file: `dist/${process.env.LERNA_PACKAGE_NAME}.js`,
  },
});
