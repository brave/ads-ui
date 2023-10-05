import {
  refetchAdvertiserCreativesQuery,
  useCreateCreativeMutation,
  useUpdateCreativeMutation,
} from "graphql/creative.generated";
import { useCallback } from "react";
import { CreativeInput } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useHistory } from "react-router-dom";
import { validCreativeFields } from "user/library";
import _ from "lodash";

export function useSubmitCreative(props: { id: string }) {
  const history = useHistory();
  const isNew = props.id === "new";
  const { advertiser } = useAdvertiser();
  const refetchQueries = [
    refetchAdvertiserCreativesQuery({ advertiserId: advertiser.id }),
  ];
  const onCompleted = () => history.replace("/user/main/creatives");

  const [createCreative, { error: createError, loading: createLoading }] =
    useCreateCreativeMutation({
      refetchQueries,
      onCompleted,
    });

  const [updateCreative, { error: updateError, loading: updateLoading }] =
    useUpdateCreativeMutation({
      refetchQueries,
      onCompleted,
    });

  const submit = useCallback(
    async (values: CreativeInput) => {
      const valid = validCreativeFields(
        { id: props.id, ...values },
        advertiser.id,
      );
      const input = _.omit(valid, ["id", "targetUrlValid", "included"]);
      if (isNew) {
        createCreative({
          variables: { input },
        });
      } else {
        updateCreative({
          variables: { input, id: props.id },
        });
      }
    },
    [createCreative, updateCreative, props.id],
  );

  return {
    submit,
    error: createError ?? updateError,
    loading: createLoading ?? updateLoading,
  };
}
