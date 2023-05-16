import { useHistory, useParams } from "react-router-dom";
import { useGetSessionById } from "checkout/hooks/useGetSession";
import { Container, LinearProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DraftContext, getDraft } from "state/context";
import { useCreateCampaignMutation } from "graphql/campaign.generated";
import { refetchAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { populateFilter, transformNewForm } from "user/library";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";

interface Params {
  referenceId: string;
}

interface Props {
  fromDate: Date | null;
}

export function ValidateCampaign({ fromDate }: Props) {
  const history = useHistory();
  const { userId } = useUser();
  const urlParams = useParams<Params>();
  const { advertiser } = useAdvertiser();
  const searchParams = new URLSearchParams(window.location.search);
  const session = searchParams.get("session_id");
  const { setDrafts } = useContext(DraftContext);

  const {
    data,
    loading: sessionLoading,
    error: sessionError,
  } = useGetSessionById({
    id: session,
  });

  const [mutation] = useCreateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserCampaignsQuery({
          id: advertiser.id,
          filter: populateFilter(fromDate),
        }),
      },
    ],
    onCompleted() {
      localStorage.removeItem(urlParams.referenceId);
      setDrafts();
      history.push("/user/main/complete/new");
    },
    onError() {
      alert("Could not verify payment");
      history.push(
        `/user/main/adsmanager/advanced/new/${urlParams.referenceId}`
      );
    },
  });

  useEffect(() => {
    const submit = async () => {
      const draft = getDraft(urlParams.referenceId);
      const newForm = await transformNewForm(draft, advertiser.id, userId);
      await mutation({ variables: { input: newForm } });
    };

    if (data && !sessionLoading && !sessionError) {
      submit();
    } else if (!sessionLoading && sessionError) {
      alert("Could not verify payment");
      history.push(
        `/user/main/adsmanager/advanced/new/${urlParams.referenceId}`
      );
    }
  }, [sessionLoading, sessionError, data]);

  return <LinearProgress />;
}
