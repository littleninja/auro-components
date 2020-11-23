const merge = require("deepmerge");
const { createBasicConfig } = require("@open-wc/building-rollup");
const postcss = require("rollup-plugin-postcss");
const { createFilter } = require("@rollup/pluginutils");
const autoprefixer = require("autoprefixer");
const postcssCustomProperties = require("postcss-custom-properties");
const comments = require("postcss-discard-comments");

// Sourced and updated from https://github.com/TrySound/rollup-plugin-string
const styleExport = (options = {}) => {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'string',
    transform(code, id) {
      if (filter(id)) {
        const content = code.replace(/\\/g, '\\\\');
        return {
          code: `import {css} from 'lit-element'; export default css\`${code}\`;`,
          map: { mappings: '' }
        }
      }
    }
  }
};

const baseConfig = createBasicConfig({
  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === "true",

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

module.exports = (args) => {
  /** for debugging build changes: **/
  // console.debug('args========', args);
  const config = merge(baseConfig, {
    input: args.i || args.input[0],
    plugins: [
      // inject css modules
      postcss({
        extensions: [".scss"],
        autoModules: false,
        modules: false,
        plugins: [autoprefixer, postcssCustomProperties, comments],
      }),
      // export scss as string
      // styleExport({
      //   include: "src/**/*.scss",
      // })
    ],
    output: {
      file: args.o || args.file,
    },
  });
  // console.debug('config========', config);
  return config;
}
  
