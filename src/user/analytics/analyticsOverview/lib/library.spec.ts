import moment from "moment";
import {EngagementFragment} from "../../../../graphql/analytics-overview.generated";
import {calculateMetric, processData, processStats} from "./overview.library";
import {Metrics} from "../types";

const price = 0.1;
const pricetype = "view";
const date = moment(new Date(2023, 1, 29, 8, 45)).utc(true).toDate();

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
    cost: 0,
    count: 25,
    ios: 0,
    linux: 0,
    macos: 25,
    windows: 0,
    type: "view",
  },
  {
    ...commonTwo,
    android: 0,
    cost: 0,
    count: 6,
    ios: 6,
    linux: 0,
    macos: 0,
    windows: 0,
    type: "view",
  },
  {
    ...commonTwo,
    android: 4,
    cost: 0,
    count: 4,
    ios: 0,
    linux: 0,
    macos: 0,
    windows: 0,
    type: "view",
  },
  {
    ...commonOne,
    android: 0,
    cost: 0,
    count: 12,
    ios: 0,
    linux: 12,
    macos: 0,
    windows: 0,
    type: "view",
  },
  {
    ...commonOne,
    android: 0,
    cost: 0,
    count: 2,
    ios: 0,
    linux: 2,
    macos: 0,
    windows: 0,
    type: "landed",
  },
  {
    ...commonTwo,
    android: 0,
    cost: 0,
    count: 3,
    ios: 0,
    linux: 0,
    macos: 3,
    windows: 0,
    type: "landed",
  },
  {
    ...commonOne,
    android: 0,
    cost: 0,
    count: 2,
    ios: 0,
    linux: 0,
    macos: 0,
    windows: 2,
    type: "click",
  },
  {
    ...commonTwo,
    android: 0,
    cost: 0,
    count: 2,
    ios: 1,
    linux: 0,
    macos: 1,
    windows: 0,
    type: "click",
  },
  {
    ...commonOne,
    android: 0,
    cost: 0,
    count: 3,
    ios: 0,
    linux: 0,
    macos: 3,
    windows: 0,
    type: "conversion",
  },
];

it("should calculate overall stats", () => {
  const stats = processStats(engagements);
  expect(stats).toMatchInlineSnapshot(`
    {
      "clicks": 4,
      "convRate": 75,
      "conversions": 3,
      "cpa": 0,
      "ctr": 8.51063829787234,
      "dismissRate": 0,
      "dismissals": 0,
      "downvotes": 0,
      "landingRate": 125,
      "landings": 5,
      "spend": 0,
      "upvotes": 0,
      "views": 47,
      "visitRate": 10.638297872340425,
    }
  `);
});

it("should calculate specific time series data by time range", () => {
  const metrics: Metrics = {
    metric1: "views",
    metric2: "clicks",
    metric3: "conversions",
    metric4: "landings",
  };

  const stats = processData(engagements, metrics, "hourly");
  expect(stats).toMatchInlineSnapshot(`
    {
      "metric1DataSet": [
        [
          1677657600000,
          47,
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
