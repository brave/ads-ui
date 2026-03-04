import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import {
  AdvertiserCreativesDocument,
  CreateCreativeDocument,
} from "@/graphql-client/graphql";
import { graphql } from "@/graphql-client/index";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { validCreativeFields } from "@/user/library";
import { CreativeInputWithType } from "@/user/views/adsManager/types";
import { useMutation } from "@apollo/client";
import _ from "lodash";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

const Update_Creative_Payload = graphql(`
  mutation AdsManagerUpdateCreativePayload(
    $input: AdsManagerUpdateCreativeInput!
  ) {
    adsManagerUpdateCreativePayload(adsManagerUpdateCreativeInput: $input) {
      id
    }
  }
`);

export function useSubmitCreative(props: { id: string }) {
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const history = useHistory();
  const isNew = props.id === "new";
  const { advertiser } = useAdvertiser();
  const refetchQueries = [
    {
      query: AdvertiserCreativesDocument,
      variables: { advertiserId: advertiser.id },
    },
  ];
  const onCompleted = () => {
    trackMatomoEvent("creative", isNew ? "creation-success" : "update-success");
    history.replace("/user/main/ads");
  };
  const onError = () => {
    trackMatomoEvent("creative", isNew ? "creation-failed" : "update-failed");
  };

  const [createCreative, { error: createError, loading: createLoading }] =
    useMutation(CreateCreativeDocument, {
      refetchQueries,
      onCompleted,
      onError,
    });

  const [updateCreative, { error: updateError, loading: updateLoading }] =
    useMutation(Update_Creative_Payload, {
      refetchQueries,
      onCompleted,
      onError,
    });

  const submit = useCallback(
    async (values: CreativeInputWithType, submitting: (s: boolean) => void) => {
      submitting(true);
      const valid = validCreativeFields(
        { id: props.id, ...values },
        advertiser.id,
      );

      const input = {
        ..._.omit(valid, ["id", "targetUrlValid", "included", "type"]),
        state: "under_review",
      };

      try {
        if (isNew) {
          await createCreative({
            variables: { input: input },
          });
        } else {
          await updateCreative({
            variables: {
              input: {
                id: props.id,
                name: input.name,
                payloadNotification: input.payloadNotification,
                payloadInlineContent: _.omit(
                  input.payloadInlineContent,
                  "dimensions",
                ),
              },
            },
          });
        }
      } finally {
        submitting(false);
      }
    },
    [createCreative, updateCreative, props.id, advertiser.id, isNew],
  );

  return {
    submit,
    error: createError ?? updateError,
    loading: createLoading ?? updateLoading,
  };
}
