const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('image diff', () => {
  it('should match', async () => {
    await browser.url('http://localhost:8000/?path=/story/aurorunner--simple');
    const result = await browser.checkScreen('aurorunner--simple');
    expect(result).toEqual(0);
  });
});