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
// eslint-disable-next-line max-params
isToday = (today, year, month, date) => today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === Number(date);

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
    const now = new Date(Date.now());

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

  /* eslint-disable one-var, no-magic-numbers, no-mixed-operators, max-params */
  getCalendarDates() {
    const today = new Date();
    const { year } = this;
    const month = this.month + this.monthOffset;
    const offset = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const endOffset = 7 - (offset + lastDate % 7);

    const emptyStartDates = Array.from({ length: offset }, () => "empty");
    const dates = Array.from({ length: lastDate }, (date, index) => index + 1);
    const emptyEndDates = Array.from({ length: endOffset }, () => "empty");

    return html`
    ${[
      ...emptyStartDates,
      ...dates,
      ...emptyEndDates
    ].map((date) => html`
    <span class="${isToday(today, year, month, date) ? 'datepicker__today' : ''}">${date}</span>
    `)}
    `;
  }
  /* eslint-enable one-var, no-magic-numbers, no-mixed-operators, max-params */

  prevMonth() {
    this.monthOffset -= 1;
  }

  nextMonth() {
    this.monthOffset += 1;
  }

  render() {
    const currentMonth = new Date(this.year, this.month + this.monthOffset);


return html`
      <div>
        ${friendlyMonth[currentMonth.getMonth()]} ${currentMonth.getFullYear()}
      </div>
      <button @click=${this.prevMonth}>prev</button>
      <button @click=${this.nextMonth}>next</button>
      <div class="datepicker">${this.getCalendarDates()}</div>
    `;
  }
}

/* istanbul ignore else */
// define the name of the custom component
if (!customElements.get("auro-datepicker")) {
  customElements.define("auro-datepicker", AuroDatepicker);
}
