import moment from "moment";
import { CampaignFormat } from "graphql/types";
import { EngagementFragment } from "graphql/analytics-overview.generated";
import { mapDevice, processOs } from "./os.library";
import { calculateMetric, processData, processStats } from "./overview.library";
import { creativeEngagements } from "./creative.library";
import { Metrics } from "../types";

const price = 0.1;
const pricetype = "view";
const date = moment("2023-03-01T08:45:00.000Z").toISOString();

const commonFields = {
  creativeinstanceid: "",
  creativesetid: "",
  creativesetname: "",
  creativestate: "",
  price,
  pricetype,
  other: 0,
  createdat: date,
};

const commonOne = {
  ...commonFields,
  creativeid: "ded77e4c-e366-40f3-93ea-9e2fd97edc48",
  creativename: "name one",
  creativepayload: `{"title": "name one", "body": "be cool"}`,
};

const commonTwo = {
  creativeid: "a25d7444-7d84-482f-99ea-6eeb566f328d",
  creativename: "name two",
  creativepayload: `{"title": "name two", "body": "be uncool"}`,
  ...commonFields,
};

const engagements: EngagementFragment[] = [
  {
    ...commonOne,
    android: 0,
    spend: "0",
    view: "25",
    click: "0",
    landed: "0",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 0,
    macos: 25,
    windows: 0,
    type: "view",
  },
  {
    ...commonTwo,
    android: 0,
    spend: "0",
    view: "6",
    click: "0",
    landed: "0",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 6,
    linux: 0,
    macos: 0,
    windows: 0,
    type: "view",
  },
  {
    ...commonTwo,
    android: 4,
    spend: "0",
    view: "4",
    click: "0",
    landed: "0",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 0,
    macos: 0,
    windows: 0,
    type: "view",
  },
  {
    ...commonOne,
    android: 0,
    spend: "0",
    view: "12",
    click: "0",
    landed: "0",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 12,
    macos: 0,
    windows: 0,
    type: "view",
  },
  {
    ...commonOne,
    android: 0,
    spend: "0",
    view: "0",
    click: "0",
    landed: "2",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 2,
    macos: 0,
    windows: 0,
    type: "landed",
  },
  {
    ...commonTwo,
    android: 0,
    spend: "0",
    view: "0",
    click: "0",
    landed: "3",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 0,
    macos: 3,
    windows: 0,
    type: "landed",
  },
  {
    ...commonOne,
    android: 0,
    spend: "0",
    view: "0",
    click: "2",
    landed: "0",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 0,
    macos: 0,
    windows: 2,
    type: "click",
  },
  {
    ...commonTwo,
    android: 0,
    spend: "0",
    view: "0",
    click: "2",
    landed: "0",
    conversion: "0",
    clickthroughConversion: "0",
    viewthroughConversion: "0",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 1,
    linux: 0,
    macos: 1,
    windows: 0,
    type: "click",
  },
  {
    ...commonOne,
    android: 0,
    spend: "0",
    view: "25",
    click: "0",
    landed: "0",
    conversion: "3",
    clickthroughConversion: "1",
    viewthroughConversion: "2",
    dismiss: "0",
    downvote: "0",
    upvote: "0",
    ios: 0,
    linux: 0,
    macos: 3,
    windows: 0,
    type: "conversion",
  },
];

it("for a number of engagements, should calculate counts correctly", () => {
  const processed = processOs(engagements);
  expect(processed).toMatchInlineSnapshot(`
    {
      "click": {
        "android": 0,
        "ios": 1,
        "linux": 0,
        "macos": 1,
        "windows": 2,
      },
      "conversion": {
        "android": 0,
        "ios": 0,
        "linux": 0,
        "macos": 3,
        "windows": 0,
      },
      "dismiss": {
        "android": 0,
        "ios": 0,
        "linux": 0,
        "macos": 0,
        "windows": 0,
      },
      "landed": {
        "android": 0,
        "ios": 0,
        "linux": 2,
        "macos": 3,
        "windows": 0,
      },
      "spend": {
        "android": 0.4,
        "ios": 0.6000000000000001,
        "linux": 1.2000000000000002,
        "macos": 2.5,
        "windows": 0,
      },
      "view": {
        "android": 4,
        "ios": 6,
        "linux": 12,
        "macos": 25,
        "windows": 0,
      },
    }
  `);
});

it("should calculate device views correctly", () => {
  const processed = processOs(engagements);
  const device = mapDevice(Object.entries(processed.view));

  expect(device).toMatchInlineSnapshot(`
    {
      "desktop": 37,
      "mobile": 10,
    }
  `);
});

it("should calculate landings, ctr, and cpa correctly", () => {
  const processed = processOs(engagements);
  const landed = calculateMetric(
    true,
    processed.landed.macos,
    processed.click.macos,
  );
  const ctr = calculateMetric(
    true,
    processed.click.macos,
    processed.view.macos,
  );
  const cpa = calculateMetric(
    false,
    processed.spend.macos,
    processed.conversion.macos,
  );

  expect(landed.toNumber()).toBe(300);
  expect(ctr.toNumber()).toBe(4);
  const fixed = cpa.toPrecision(2);
  expect(fixed).toBe("0.83");
});

it("should calculate metrics per creative id", () => {
  const creatives = creativeEngagements(
    engagements,
    CampaignFormat.PushNotification,
  );

  expect(creatives).toMatchInlineSnapshot(`
    [
      {
        "clicks": "2",
        "clickthroughConversion": "1",
        "convRate": "150",
        "conversions": "3",
        "cpa": "0",
        "creativePayload": {
          "body": "be cool",
          "title": "name one",
        },
        "ctr": "3.226",
        "dismissRate": "0",
        "dismissals": "0",
        "downvotes": "0",
        "landingRate": "100",
        "landings": "2",
        "spend": "0",
        "upvotes": "0",
        "views": "62",
        "viewthroughConversion": "2",
        "visitRate": "3.226",
      },
      {
        "clicks": "2",
        "clickthroughConversion": "0",
        "convRate": "0",
        "conversions": "0",
        "cpa": "0",
        "creativePayload": {
          "body": "be uncool",
          "title": "name two",
        },
        "ctr": "20",
        "dismissRate": "0",
        "dismissals": "0",
        "downvotes": "0",
        "landingRate": "150",
        "landings": "3",
        "spend": "0",
        "upvotes": "0",
        "views": "10",
        "viewthroughConversion": "0",
        "visitRate": "30",
      },
    ]
  `);
});

it("should calculate overall stats", () => {
  const stats = processStats(engagements);
  expect(stats).toMatchInlineSnapshot(`
    {
      "clicks": "4",
      "clickthroughConversion": "1",
      "convRate": "75",
      "conversions": "3",
      "cpa": "0",
      "ctr": "5.556",
      "dismissRate": "0",
      "dismissals": "0",
      "downvotes": "0",
      "landingRate": "125",
      "landings": "5",
      "spend": "0",
      "upvotes": "0",
      "views": "72",
      "viewthroughConversion": "2",
      "visitRate": "6.944",
    }
  `);
});

it("should calculate specific time series data by time range", () => {
  const metrics: Metrics = {
    metric1: { key: "views", active: true },
    metric2: { key: "clicks", active: true },
    metric3: { key: "conversions", active: true },
    metric4: { key: "landings", active: true },
  };

  const stats = processData(engagements, metrics, "hourly");
  expect(stats).toMatchInlineSnapshot(`
    {
      "metric1DataSet": [
        [
          1677657600000,
          72,
        ],
      ],
      "metric2DataSet": [
        [
          1677657600000,
          4,
        ],
      ],
      "metric3DataSet": [
        [
          1677657600000,
          3,
        ],
      ],
      "metric4DataSet": [
        [
          1677657600000,
          5,
        ],
      ],
    }
  `);
});
