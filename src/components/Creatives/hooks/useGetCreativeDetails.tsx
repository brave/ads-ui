import { useLoadCreativeQuery } from "graphql/creative.generated";
import { CreativeInput } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

export function useGetCreativeDetails(props: { id: string }) {
  const { advertiser } = useAdvertiser();
  const isNew = props.id === "new";
  const { data, loading, error } = useLoadCreativeQuery({
    variables: { id: props.id },
    skip: isNew,
  });

  const defaultValue: CreativeInput & { targetUrlValid: boolean } = {
    advertiserId: "",
    state: "under_review",
    name: "",
    type: {
      code: "notification_all_v1",
    },
    targetUrlValid: false,
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
            targetUrlValid: true,
          }
        : defaultValue,
    loading,
    error,
  };
}
