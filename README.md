[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/chargebee-card) [![npm version](https://badge.fury.io/js/chargebee-card.svg)](https://badge.fury.io/js/chargebee-card)


# \<chargebee-card>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i chargebee-card
```

## Usage

You need to make sure to enable shadyDom and import chargebee

```html
<!-- 1. Import Chargebee & Initialize -->
  <script src="https://js.chargebee.com/v2/chargebee.js">
        Chargebee.init({
          "site": "my-site",
          "publishableKey": "test_3yuhb4yuh24iuyh34i3h4oiu23h4"
        })</script>

  <!-- 2. Import all font's used by charbee components -->
  <link href="https://fonts.googleapis.com/css?family=Karla&display=swap" rel="stylesheet">

  <!-- 3. Enable ShadyDom -->
<script>/* eslint-disable */if (window.customElements) window.customElements.forcePolyfill = !0; ShadyDOM = { force: !0 }; function idToChainedClass(poly, _this) { if (ShadyDOM) { const allElements = poly.dom(_this.root).querySelectorAll('*'); let id; for (let x = 0, len = allElements.length; x < len; x++) { if (allElements[x].id) { id = allElements[x].id; allElements[x].removeAttribute('id'); allElements[x].classList.add(id); _this.$[id] = poly.dom(_this.root).querySelector(`.${  id}`) } } } }</script>
  <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

<script type="module">
  import 'chargebee-card/chargebee-card.js';
</script>
<!-- Optional. You can intantiate Charbeee via the component by passing the site and publishableKey -->
<chargebee-card site="my-site" publishableKey="test_3yuhb4yuh24iuyh34i3h4oiu23h4"></chargebee-card>
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```
or to run them in compatibility mode for legacy browsers
```bash
npm run test:compatibility
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```
or
```bash
npm run test:compatibility
```

## Testing with Karma via BrowserStack
To run the suite of karma tests in BrowserStack, run
```bash
npm run test:bs
```

## Managing Test Snapshots
You can manage the test snapshots using
```bash
npm run test:update-snapshots
```
or
```bash
npm run test:prune-snapshots
```

## Demoing with Storybook
To run a local instance of Storybook for your component, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```


## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`

```bash
npm start:compatibility
```
To run a local development server in compatibility mode for older browsers that serves the basic demo located in `demo/index.html`
