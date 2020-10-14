```js script
import { html } from "lit-html";
import "../dist/auro-runner.js";

export default {
  title: "AuroRunner",
  parameters: { component: "auro-runner" },
};
```

# Auro Runner

A component to place a little runner on the page

```js story
export const Simple = () => html` <auro-runner>Hello World</auro-runner> `;
```

Adding a bit of fluff for a new component version!