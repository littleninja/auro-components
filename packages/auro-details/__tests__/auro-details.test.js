"use strict";
import { fixture, expect, html } from "@open-wc/testing";
import("..");

describe("auro-details", () => {
  it("says hello", async () => {
    const el = await fixture(html`<auro-details>Hello!</auro-details>`);
    expect(el.textContent).to.contain("Hello!");
  });
});
