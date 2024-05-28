import { SearchProspectsLandingPageListFragment } from "@/graphql-client/graphql";
import { Basket } from "./basket";
import { CountryDomain } from "./types";
import { SearchOptions } from "./form";
import { triggerBrowserDownload } from "@/util/download";

interface Params {
  domain: CountryDomain;
  landingPages: SearchProspectsLandingPageListFragment[];
  basket: Basket;
  options: SearchOptions;
}

function generateFile({ domain, landingPages, basket, options }: Params): Blob {
  const content = {
    domain: domain.domain,
    country: domain.country,
    options,
    landingPages: landingPages.flatMap((landingPage) => {
      if (!basket.isLandingPageSelected(landingPage.url)) {
        return [];
      }

      const creativeIdx = basket.creativeIndexForLandingPage(landingPage.url);
      const creative = landingPage.creatives[creativeIdx];

      return {
        url: landingPage.url,
        selectedCreativeIndex: creativeIdx,
        creatives: [
          {
            title: creative.title,
            body: creative.body,
            lastSeen: creative.lastSeen,
          },
        ],
      };
    }),
  };

  const s = JSON.stringify(content, null, 2);

  return new Blob([s], { type: "application/json" });
}

export function generateAndDownloadFile(params: Params) {
  const file = generateFile(params);

  triggerBrowserDownload(
    file,
    `search-${params.domain.domain}-${params.domain.domain}.json`,
  );
}
