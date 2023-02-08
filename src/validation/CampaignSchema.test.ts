import { parseISO } from "date-fns";
import { produce } from "immer";
import {CampaignFormat, CampaignPacingStrategies} from "../graphql/types";
import {CampaignSchema} from "./CampaignSchema";

const validCampaign = {
  name: "some campaign",
  budget: 1000,
  currency: "GBP",
  dailyBudget: 100,
  dailyCap: 1,
  startAt: parseISO("2030-07-18"),
  endAt: parseISO("2030-07-20"),
  format: CampaignFormat.PushNotification,
  geoTargets: [{code: "a", name: "USA"}],
  state: "any",
  type: "paid",
  pacingStrategy: CampaignPacingStrategies.Original,
  validateStart: true
};

it("should pass on a valid object", () => {
  CampaignSchema.validateSync(validCampaign);
});

it("should fail if the campaign start date is in past", () => {
  const c = produce(validCampaign, (draft) => {
    draft.startAt = parseISO("2020-07-18");
  });

  expect(() =>
    CampaignSchema.validateSync(c)
  ).toThrowErrorMatchingInlineSnapshot(`"Start Date must not be in the past"`);
});
