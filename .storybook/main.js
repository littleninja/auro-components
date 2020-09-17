module.exports = {
  // Globs of all the stories in your project
  stories: ["../packages/!(create)/**/stories/*.stories.{js,md}"],

  // Configuration for es-dev-server (start-storybook only)
  esDevServer: {
    watch: false,
    https: true,
    nodeResolve: true,
    open: true,
  },
};
