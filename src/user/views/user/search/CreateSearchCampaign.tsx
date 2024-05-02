import { Box, Container } from "@mui/material";
import { CountryDomain } from "./types";
import { CardContainer } from "@/components/Card/CardContainer";
import { graphql } from "@/graphql-client";
import { useQuery } from "@apollo/client";
import { LandingPageList } from "./LandingPageList";
import { useBasket } from "./basket";
import { useCountries } from "@/components/Country/useCountries";
import { SummaryPanel } from "./SummaryPanel";
import { useMemo, useState } from "react";
import { SetupProgress, Steps } from "./SetupProgress";
import { Finalize } from "./Finalize";
import { SearchOptions, SearchOptionsSchema } from "./form";
import { Form, Formik } from "formik";
import { generateAndDownloadFile } from "./generate-file";

const CreateSearchCampaign_LandingPageList = graphql(`
  query CreateSearchCampaign_LandingPageList(
    $domain: String!
    $country: String!
    $offset: Float!
    $limit: Float!
  ) {
    searchProspects {
      landingPagesWithStats(
        country: $country
        domain: $domain
        offset: $offset
        limit: $limit
      ) {
        ...SearchProspects_LandingPageList
      }
    }
  }

  fragment SearchProspects_LandingPageList on SearchLandingPageWithStats {
    url
    rank
    lastSeen
    favicon
    creatives {
      title
      body
      lastSeen
    }
  }
`);

interface Props {
  domain: CountryDomain;
}

export function CreateSearchCampaign({ domain }: Props) {
  const countries = useCountries();
  const basket = useBasket();
  const [step, setStep] = useState(Steps.ADS);

  const { data } = useQuery(CreateSearchCampaign_LandingPageList, {
    variables: {
      country: domain.country,
      domain: domain.domain,
      offset: 0,
      limit: 1000,
    },
  });

  const selectedCountryName =
    countries.data.find((c) => c.code === domain.country.toUpperCase())?.name ??
    domain.country.toUpperCase();

  const landingPages = data?.searchProspects.landingPagesWithStats;

  const selectedCount = useMemo(() => {
    if (!landingPages) return undefined;

    return basket.calcSelectedLandingPagesCount(
      landingPages.map((lp) => lp.url),
    );
  }, [landingPages, basket]);

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={SearchOptionsSchema.getDefault() as any}
        validationSchema={SearchOptionsSchema}
        onSubmit={(values: SearchOptions) => {
          if (landingPages) {
            generateAndDownloadFile({
              basket,
              domain,
              landingPages,
              options: values,
            });
          }
        }}
      >
        <Form>
          <Box display="flex" gap={2}>
            <CardContainer
              childSx={{
                width: "800px",
                height: "calc(100vh - 110px)",
              }}
            >
              {step === Steps.ADS && (
                <LandingPageList
                  landingPages={landingPages}
                  basket={basket}
                  domain={domain}
                />
              )}

              {step === Steps.FINALIZE && <Finalize />}
            </CardContainer>

            <Box display="flex" flexDirection="column" gap={3}>
              <SummaryPanel
                domain={domain}
                countryName={selectedCountryName}
                selectedCount={selectedCount}
                totalCount={landingPages?.length}
              />
              <SetupProgress
                step={step}
                onNext={onNextStep}
                onPrev={onPrevStep}
              />
            </Box>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
}
