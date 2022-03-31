import {cleanUpUrl} from "./ReviewForm.library";

describe("url normalization", () => {
  test.each(
    [
      ["example.com", "https://example.com/"],
      ["http://example.com", "https://example.com/"],
      ["https://example.com", "https://example.com/"],
      ["https://example.com?b=1&c=2", "https://example.com/?b=1&c=2"],
      ["https://example.com#some_fragment=yes", "https://example.com/#some_fragment=yes"],
      ["https://example.com/?a=1#some_fragment=yes", "https://example.com/?a=1#some_fragment=yes"],
      ["https://example.com/path?a=1#some_fragment=yes", "https://example.com/path?a=1#some_fragment=yes"],
    ]
 )('%s cleans to %s', (input, expected) => {
    expect(cleanUpUrl(input)).toBe(expected);
  })
})