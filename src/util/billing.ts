import { CPM } from "validation/CampaignSchema";

export const adjustToCPM = (n: number) => Math.round(n / CPM) * CPM;
