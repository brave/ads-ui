import { LoadCreativeDocument } from "@/graphql-client/graphql";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import { useQuery } from "@apollo/client";
import { CreativeInputWithType } from "@/user/views/adsManager/types";

export function useGetCreativeDetails(props: { id: string }) {
  const { advertiser } = useAdvertiser();
  const isNew = props.id === "new";
  const { data, loading, error } = useQuery(LoadCreativeDocument, {
    variables: { id: props.id },
    skip: isNew,
  });
  const { _ } = useLingui();

  const defaultValue: CreativeInputWithType & { targetUrlValid?: string } = {
    advertiserId: advertiser.id,
    state: "under_review",
    name: "",
    type: {
      code: "notification_all_v1",
    },
    targetUrlValid: _(msg`Target URL not validated`),
    payloadNotification: {
      body: "",
      targetUrl: "",
      title: "",
    },
    payloadInlineContent: {
      title: "",
      targetUrl: "",
      ctaText: "",
      description: "",
      imageUrl: "",
      dimensions: "900x750",
    },
  };

  if (props.id === "new") {
    return { data: defaultValue, loading: false, error: undefined };
  }

  return {
    data:
      data && data.creative
        ? {
            ...data.creative,
            advertiserId: advertiser.id,
            targetUrlValid: undefined,
          }
        : undefined,
    loading,
    error,
  };
}
