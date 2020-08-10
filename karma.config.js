const { createDefaultConfig } = require("@open-wc/testing-karma");
const merge = require("deepmerge");
const path = require("path");

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      // see https://karma-runner.github.io/5.0/config/files.html
      files: [
        {
          pattern: config.grep
            ? config.grep
            : "packages/**/__tests__/**/*.test.js",
          type: "module",
        },
      ],

      plugins: ["karma-coverage-istanbul-reporter"],

      singleRun: true,

      // see the karma-esm docs for all options
      esm: {
        // if you are using 'bare module imports' you will need this option
        nodeResolve: true,
        preserveSymlinks: true,
      },

      reporters: ["progress", "junit", "coverage-istanbul"],
      coverageIstanbulReporter: {
        thresholds: {
          global: {
            statements: 80,
            lines: 80,
            branches: 80,
            functions: 80,
          },
        },
      },
      junitReporter: {
        outputDir: path.join(__dirname, "reports"),
      },
    })
  );
  return config;
};
