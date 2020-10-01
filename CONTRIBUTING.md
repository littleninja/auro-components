# Contributing

## Types of contributions

### New components

First check https://auro.alaskaair.com/component-status to see if the component you're looking for is ready, in development, or proposed. If we haven't thought of it yet, open a pull request. (todo: pull request template for new component)

### New features

(If I want to a new feature or change in existing functionality, what's the process?)

### Reporting a bug

(Before opening a new bug, where should I look? What minimum bits of information should I have ready before opening a new issue?)

## Development

### Prerequisites

(Are there any known architecture constraints for development?)

### Install and build

```shell
$ npm install
$ npm run build
$ npm run build:watch
```

### Creating a new component

```shell
$ npm run create -- --name zinger
> Well done! The new HTML Custom Element auro-zinger has been created!
> Dir: packages/auro-zinger
```

### Linting

```shell
$ npm run lint

# if you need to run a specific linter
$ npm run lint:js
$ npm run lint:styles
```

### Tests

To run all tests:

```shell
$ npm test
```

To run all tests with file watch:

```shell
$ npm run test:watch
```

To target specific tests during development, include the `grep` flag:

```shell
# for single-run
$ npm test -- --grep > packages/auro-example/__tests__/*.test.js

# with watch
$ npm run test:watch -- --grep packages/auro-example/__tests__/*.test.js
```

### Documentation

#### `custom-elements.json`

Generated with many thanks to [web-component-analyzer](https://github.com/runem/web-component-analyzer), `custom-elements.json` describes the api and version of a custom component. The format is emerging and subject to change. The file is required to run Storybook and included at publish for consumers.

#### `README.md`

Before submitting a pull request, please take a moment to add or update the component `README.md`. Including PNG screenshots and animated GIFs interactions in your package `docs/` is encouraged.

### stories

(todo)

### Pull request

(If I open a pull request, does it need to link to an open issue? Who will review my request and how long will that take? Are there basics that need to pass: build succeeds, lint-free, unit tests pass, coverage met, documented and demo'd?)

## Code of conduct

(Let's make this a great place to contribute)