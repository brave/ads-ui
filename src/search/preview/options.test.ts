import { it, expect } from "vitest";
import { extractOptionsFromUrlSlug } from "./options";

it("should always pass through a slug with less that 15 characters", () => {
  expect(extractOptionsFromUrlSlug("12345678901234")).toMatchObject({
    hideBookMeeting: false,
    hideEstimates: false,
    slug: "12345678901234",
  });

  expect(extractOptionsFromUrlSlug("banana12ol")).toMatchObject({
    hideBookMeeting: false,
    hideEstimates: false,
    slug: "banana12ol",
  });
});

// if the slug is longer than 15 characters, parse an o and l from the suffix
it.each([
  {
    input: "123456789012345",
    expected: {
      slug: "123456789012345",
      hideBookMeeting: false,
      hideEstimates: false,
    },
  },
  {
    input: "1234567890123450",
    expected: {
      slug: "123456789012345",
      hideBookMeeting: false,
      hideEstimates: true,
    },
  },
  {
    input: "1234567890123450l",
    expected: {
      slug: "123456789012345",
      hideBookMeeting: true,
      hideEstimates: true,
    },
  },
  {
    input: "123456789012345l",
    expected: {
      slug: "123456789012345",
      hideBookMeeting: true,
      hideEstimates: false,
    },
  },
  {
    input: "123456789012345pppp",
    expected: {
      // the non 'o' and 'l' as passed through
      slug: "123456789012345pppp",
      hideBookMeeting: false,
      hideEstimates: false,
    },
  },
  {
    input: "123456789012345p0p0p0p",
    expected: {
      slug: "123456789012345pppp",
      hideBookMeeting: false,
      hideEstimates: true,
    },
  },
])("should process $input correctly", (condition) => {
  expect(extractOptionsFromUrlSlug(condition.input)).toMatchObject(
    condition.expected,
  );
});
