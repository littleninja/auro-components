// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------

import { LitElement, html, css } from "lit-element";
import styleCss from "./styles-css.js";

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-[name] provides a summary and detail view of content
 *
 * @attr {String} cssClass - Applies designated CSS class to DOM element.
 */

// build the component class
export class Auro[Name] extends LitElement {
  // constructor() {
  //   super();
  // }

  // function to define props used within the scope of thie component
  static get properties() {
    return {
      cssClass: { type: String },
    };
  }

  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  // function that renders the HTML and CSS into  the scope of the component
  render() {
    return html` <div class=${this.cssClass}>Hello world!</div> `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-[name]")) {
  customElements.define("auro-[name]", Auro[Name]);
}
