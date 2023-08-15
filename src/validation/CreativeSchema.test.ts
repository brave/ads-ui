import { CreativeSchema } from "./CreativeSchema";
import { produce } from "immer";

const validPushCreative = {
  name: "some creative",
  type: { code: "notification_all_v1", name: "" },
  state: "active",
  payloadNotification: {
    body: "abc",
    title: "xyz",
    targetUrl: "https://hello.com",
  },
};

it("should pass on a valid object", () => {
  CreativeSchema.validateSync(validPushCreative);
});

it.each([
  "https://example.com",
  "https://www.secure2.sophos.com/en-us/security-news-trends/whitepapers/gated-wp/endpoint-buyers-guide.aspx?cmp=134766&utm_source=Brave&utm_campaign=ASEAN%7CBrave%7CEndpointBuyer%27sGuide%7CITFocus&utm_medium=cpc&utm_content=SM116529",
  "https://test.io?bar=baz#foo",
])("should pass if push notification is selected for %s", (value) => {
  const c = produce(validPushCreative, (draft) => {
    draft.payloadNotification.targetUrl = value;
  });

  expect(() => CreativeSchema.validateSync(c));
});

it.each(["notAUrl", "gopher://blah.com", "httpx://balh.com"])(
  "should reject as invalid url if push notification is selected for %s",
  (value) => {
    const c = produce(validPushCreative, (draft) => {
      draft.payloadNotification.targetUrl = value;
    });
    expect(() => CreativeSchema.validateSync(c)).toThrowError(
      "URL must start with https:// or be an approved brave:// url",
    );
  },
);

it.each(["https://with a space"])(
  "should reject as invalid input if push notification is selected for %s",
  (value) => {
    const c = produce(validPushCreative, (draft) => {
      draft.payloadNotification.targetUrl = value;
    });
    expect(() => CreativeSchema.validateSync(c)).toThrowError(
      "URL must not contain any whitespace",
    );
  },
);

it.each(["http://example.com"])(
  "should reject as not secure if push notification is selected for %s",
  (value) => {
    const c = produce(validPushCreative, (draft) => {
      draft.payloadNotification.targetUrl = value;
    });
    expect(() => CreativeSchema.validateSync(c)).toThrowError(
      "URL must start with https://",
    );
  },
);
