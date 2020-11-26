// Copyright (c) 2020 Alaska Airlines. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------

import { LitElement, html, css, unsafeCSS } from "lit-element";
import styles from "./auro-datepicker.scss";

const friendlyMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
],
  /* eslint-disable no-extra-parens, max-params, one-var, no-magic-numbers, no-mixed-operators, max-params */
  getDateView = (date) => (date ? html`<button>${date}</button>` : ''),
  getMonthView = (year, month) => {
    const lastDate = new Date(year, month + 1, 0).getDate();
    const startOffset = new Date(year, month, 1).getDay();
    const endOffset = 7 - (startOffset + lastDate % 7);
    const emptyStartDates = Array.from({ length: startOffset }, () => getDateView());
    const dates = Array.from({ length: lastDate }, (date, index) => getDateView(index + 1));
    const emptyEndDates = Array.from({ length: endOffset }, () => getDateView());

    return html`
      <div>
      <label class="datepicker__label">${friendlyMonth[month]} ${year}</label>
      <ul class="datepicker">
      ${[
        ...emptyStartDates,
        ...dates,
        ...emptyEndDates,
      ].map((dateView) => html`<li class="datepicker__date">${dateView}</li>`)}
      </ul>
      </div>
    `
  };
  /* eslint-enable max-params, one-var, no-magic-numbers, no-mixed-operators, max-params */

// See https://git.io/JJ6SJ for "How to document your components using JSDoc"
/**
 * auro-datepicker does a component thing! (Your description here)
 *
 * @attr {String} cssClass - Applies designated CSS class to DOM element.
 */

// build the component class
export class AuroDatepicker extends LitElement {
  constructor() {
    super();
    const now = new Date();

    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.monthOffset = 0;
  }

  static get properties() {
    return {
      year: {
        type: Number
      },
      month: {
        type: Number
      },
      monthOffset: {
        type: Number,
        attribute: true
      }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  getCalendarDates() {
    /* eslint-disable no-magic-numbers */
    const focusMonthDate = new Date(this.year, this.month + this.monthOffset),
    nextMonthDate = new Date(this.year, this.month + this.monthOffset + 1),
    previousMonthDate = new Date(this.year, this.month + this.monthOffset - 1);
    /* eslint-enable no-magic-numbers */

    return html`
      ${getMonthView(previousMonthDate.getFullYear(), previousMonthDate.getMonth())}
      ${getMonthView(focusMonthDate.getFullYear(), focusMonthDate.getMonth())}
      ${getMonthView(nextMonthDate.getFullYear(), nextMonthDate.getMonth())}
    `;
  }

  prevMonth() {
    this.monthOffset -= 1;
  }

  nextMonth() {
    this.monthOffset += 1;
  }

  // keyboard navigation
  //   up arrow: -7 days
  //   down arrow: +7 days
  //   left arrow: -1 day
  //   right arrow: +1 day
  //   space/enter: toggle date selection
  //   tab/shift-tab: exit and return focus

  render() {
    return html`
          <button @click=${this.prevMonth}>prev</button>
          <button @click=${this.nextMonth}>next</button>
          <div class="datepicker__window">
            ${this.getCalendarDates()}
          <div>
        `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker")) {
  customElements.define("auro-datepicker", AuroDatepicker);
}
