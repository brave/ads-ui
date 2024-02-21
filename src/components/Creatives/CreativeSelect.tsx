import { Box, Button, Stack, Typography } from "@mui/material";
import { BoxContainer } from "components/Box/BoxContainer";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import moment from "moment";
import { SelectCreativeHeader } from "components/Creatives/SelectCreativeHeader";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import _ from "lodash";
import { PropsWithChildren, useContext, useState } from "react";
import { FormContext } from "state/context";
import { useFormikContext } from "formik";
import { CampaignFormat } from "graphql/types";
import { ImagePreview } from "components/Assets/ImagePreview";
import { Trans } from "@lingui/macro";

export function CreativeSelect(
  props: {
    options: Creative[];
    useSelectedAdStyle?: boolean;
    showState?: boolean;
    index?: number;
    hideCreated?: boolean;
    useButtonSelection?: boolean;
  } & PropsWithChildren,
) {
  const index = props.index;
  const { values, setFieldValue } = useFormikContext<CampaignForm>();
  const { setIsShowingAds } = useContext(FormContext);
  const [curr, setCurr] = useState<Creative[]>([]);

  const onSelectCreative = (c: Creative, selected: boolean) => {
    let value;
    if (selected) {
      value = [...curr, c];
    } else {
      value = _.filter(curr, (n) => n.id !== c.id);
    }

    if (index !== undefined) {
      const foundIndex = values.adSets[index].creatives.findIndex(
        (co) => c.id === co.id,
      );
      if (foundIndex >= 0) {
        void setFieldValue(
          `adSets.${index}.creatives.${foundIndex}.included`,
          selected,
        );
      }
    }

    setCurr(_.uniqBy(value, "id"));
  };

  const isSelected = (co: Creative) =>
    props.useSelectedAdStyle === false || co.included;

  return (
    <Box display="flex" flexDirection="column">
      <Stack
        direction="row"
        justifyContent={"left"}
        alignItems="center"
        flexWrap="wrap"
        maxHeight={420}
        sx={{ overflowY: props.options.length > 3 ? "scroll" : "hidden" }}
      >
        {props.options.map((co, idx) => (
          <BoxContainer
            header={
              <SelectCreativeHeader
                creative={co}
                onSelectCreative={onSelectCreative}
                showState={props.showState}
              />
            }
            key={idx}
          >
            <CreativeType
              creative={co}
              format={values.format}
              selected={isSelected(co)}
            />
            {!(props.hideCreated ?? false) && (
              <Typography
                variant="caption"
                marginLeft={1}
                color={isSelected(co) ? "text.primary" : "rgba(0, 0, 0, 0.3)"}
                textAlign="right"
              >
                <Trans>created</Trans> {moment(co.createdAt).fromNow()}
              </Typography>
            )}
          </BoxContainer>
        ))}
        {props.children}
      </Stack>
      {props.useButtonSelection && (
        <Button
          variant="outlined"
          sx={{ maxWidth: "200px", alignSelf: "end", marginTop: 2 }}
          onClick={(e) => {
            e.preventDefault();

            const mapped = curr.map((c) => ({ ...c, included: true }));
            values.adSets.forEach((adSet, idx) => {
              void setFieldValue(
                `adSets.${idx}.creatives`,
                _.uniqBy([...adSet.creatives, ...mapped], "id"),
              );
            });

            setIsShowingAds(false);
          }}
        >
          <Trans>Complete selection</Trans>
        </Button>
      )}
    </Box>
  );
}

const CreativeType = (props: {
  creative: Creative;
  format: CampaignFormat;
  selected: boolean;
}) => {
  const co = props.creative;
  if (props.format === CampaignFormat.PushNotification) {
    return (
      <NotificationPreview
        title={co.payloadNotification?.title}
        body={co.payloadNotification?.body}
        selected={props.selected}
      />
    );
  } else if (props.format === CampaignFormat.NewsDisplayAd) {
    return (
      <ImagePreview
        url={co.payloadInlineContent?.imageUrl ?? ""}
        width={300}
        height={200}
        selected={props.selected}
      />
    );
  }

  return null;
};
