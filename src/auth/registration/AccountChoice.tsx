import {
  Box,
  createSvgIcon,
  List,
  ListItemButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { msg, Trans } from "@lingui/macro";
import { Trans as TranslateWithId } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";
import { AccountSetup } from "auth/registration/types";
import { useField } from "formik";

const Pointer = createSvgIcon(
  <svg
    width="117"
    height="117"
    viewBox="0 0 117 117"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M102.172 67.5221C101.707 70.3534 95.6127 96.9565 94.9186 99.9787C94.9034 100.06 94.8538 100.121 94.8309 100.198C94.7737 100.393 94.6898 100.568 94.6097 100.751C94.4877 101.023 94.3542 101.275 94.1826 101.502C94.0758 101.652 93.9576 101.782 93.8279 101.916C93.6067 102.144 93.3665 102.327 93.0995 102.493C93.0042 102.55 92.9431 102.644 92.8402 102.692C92.4664 102.879 83.5311 107.25 70.4312 107.25C57.8462 107.25 49.3228 103.253 48.3198 102.761C48.316 102.757 48.3083 102.753 48.3045 102.753C48.2702 102.737 48.1634 102.688 48.152 102.68C47.927 102.566 47.7706 102.375 47.5799 102.221C47.4045 102.087 47.2062 102.006 47.0498 101.835C46.821 101.579 41.3294 95.4372 35.136 84.441C29.4461 74.3384 20.7815 65.5438 20.69 65.4585C19.195 63.9474 19.0959 61.4248 20.465 59.7836C25.907 53.2679 37.5005 52.4718 43.8692 58.171L46.0659 60.527V21.9487C46.0659 14.718 50.524 9.75 57.1636 9.75C63.7955 9.75 68.9477 14.7465 68.9477 21.9487V46.6385C69.699 46.5979 70.4884 46.6101 71.3465 46.7644C74.3135 47.2966 76.392 49.0027 77.7725 50.9078C79.7022 50.1604 82.0514 49.8395 84.5531 50.6072C87.1655 51.4075 88.9274 52.9958 90.0715 54.6856C91.9058 54.2875 94.194 54.251 96.5356 55.3599C100.917 57.4317 103.076 62.095 102.172 67.5221ZM93.4927 62.7853C91.9978 62.0744 90.0452 63.1996 90.0261 63.2118C88.9316 63.9186 87.5816 63.9795 86.4413 63.3865C85.2972 62.7893 84.5078 61.6153 84.3438 60.2586C84.298 60.027 83.9739 58.8653 82.4827 58.4103C80.5569 57.8132 78.8445 59.4421 78.8255 59.4583C77.8377 60.4779 76.4152 60.8435 75.1072 60.417C73.7953 59.9864 72.8075 58.8246 72.5177 57.3866C72.4757 57.2079 71.9342 55.0996 70.1037 54.7706C69.6155 54.6812 69.2075 54.734 68.8414 54.8275C68.5553 56.6473 66.5875 56.9154 64.6502 56.9154C62.648 56.9154 61.4505 56.6595 61.3552 54.6528C60.8098 53.5398 60.8098 52.248 61.3209 51.1065V21.9483C61.3209 19.2145 59.6314 17.8659 57.164 17.8659C54.0788 17.8659 53.4304 20.1285 53.4304 22.0296V69.6422C53.5944 70.8649 53.3046 72.1404 52.4313 73.0828C52.4084 73.1031 52.3817 73.1113 52.3588 73.1316C51.6724 73.8912 50.7228 74.3746 49.6588 74.3746C48.1714 74.3746 47.0083 73.619 46.4439 72.3882L38.7899 64.1583C36.597 62.2125 32.383 61.8997 29.1681 63.1183C32.4745 66.8718 37.6153 73.1763 41.5891 80.2363C46.3333 88.6572 50.6198 93.9908 51.9813 95.6156C53.9415 96.4606 60.8518 99.1375 70.4316 99.1375C78.8674 99.1375 85.24 97.0983 88.0621 96.0056C90.7431 84.2822 94.4423 67.9361 94.7436 66.0959C95.1669 63.5774 93.9923 63.0209 93.4927 62.7853Z"
      fill="#687485"
    />
  </svg>,
  "Pointer",
);

const Team = createSvgIcon(
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M110 81.6667V85C110 87.3 108.137 89.1667 105.833 89.1667H80.8333C80.8333 91.4667 78.9708 93.3333 76.6667 93.3333H43.3333C41.0292 93.3333 39.1667 91.4667 39.1667 89.1667H14.1667C11.8625 89.1667 10 87.3 10 85V81.6667C10 74.7542 13.8667 68.8208 19.4208 65.9792C16.2542 63.7083 14.1667 60.0208 14.1667 55.8333C14.1667 48.9417 19.775 43.3333 26.6667 43.3333C33.5583 43.3333 39.1667 48.9417 39.1667 55.8333C39.1667 60.0208 37.0833 63.7083 33.9125 65.9792C37.6083 67.8708 40.5208 71.1458 42.0833 75.1458C44.3042 71.1375 47.625 67.9042 51.6833 66.025C46.7167 63.1333 43.3333 57.8125 43.3333 51.6667C43.3333 42.475 50.8083 35 60 35C69.1917 35 76.6667 42.475 76.6667 51.6667C76.6667 57.8125 73.2833 63.1333 68.3167 66.025C72.375 67.9042 75.6958 71.1375 77.9167 75.1458C79.4792 71.1458 82.3917 67.8708 86.0875 65.9792C82.9208 63.7083 80.8333 60.0208 80.8333 55.8333C80.8333 48.9417 86.4417 43.3333 93.3333 43.3333C100.225 43.3333 105.833 48.9417 105.833 55.8333C105.833 60.0208 103.75 63.7083 100.579 65.9792C106.133 68.8208 110 74.7542 110 81.6667ZM26.6667 51.6667C24.3667 51.6667 22.5 53.5375 22.5 55.8333C22.5 58.1292 24.3667 60 26.6667 60C28.9667 60 30.8333 58.1292 30.8333 55.8333C30.8333 53.5375 28.9667 51.6667 26.6667 51.6667ZM26.6669 72.5C22.3294 72.5 18.7544 76.1708 18.3669 80.8333H34.9669C34.5794 76.1708 31.0044 72.5 26.6669 72.5ZM60 43.3333C55.4042 43.3333 51.6667 47.0708 51.6667 51.6667C51.6667 56.2625 55.4042 60 60 60C64.5917 60 68.3333 56.2625 68.3333 51.6667C68.3333 47.0708 64.5917 43.3333 60 43.3333ZM59.9998 72.5C53.4748 72.5 48.104 78.0083 47.5498 85H72.4498C71.8998 78.0083 66.5248 72.5 59.9998 72.5ZM93.3333 51.6667C91.0333 51.6667 89.1667 53.5375 89.1667 55.8333C89.1667 58.1292 91.0333 60 93.3333 60C95.6333 60 97.5 58.1292 97.5 55.8333C97.5 53.5375 95.6333 51.6667 93.3333 51.6667ZM93.3342 72.5C88.9967 72.5 85.4217 76.1708 85.0342 80.8333H101.634C101.247 76.1708 97.6717 72.5 93.3342 72.5Z"
      fill="#687485"
    />
  </svg>,
  "Team",
);

interface ChoiceOptions {
  title: MessageDescriptor;
  icon: any;
  description: MessageDescriptor;
  points: MessageDescriptor[];
  value: AccountSetup;
  minSpend: string;
}

export function AccountChoice() {
  const buttons: ChoiceOptions[] = [
    {
      title: msg`Self-service`,
      icon: <Pointer sx={{ height: "1.5em", width: "1.5em" }} />,
      description: msg`For small to mid-sized businesses to create and manage their Brave Ads campaigns independently.`,
      points: [msg`Notification ads`, msg`Newsfeed ads`],
      value: "self",
      minSpend: "500",
    },
    {
      title: msg`Managed service`,
      icon: <Team sx={{ height: "1.5em", width: "1.5em" }} />,
      description: msg`For enterprise and agency businesses looking for bespoke ad solutions via dedicated Brave Ads representatives.`,
      points: [
        msg`Search keyword ads`,
        msg`New tab takeover`,
        msg`Notification ads`,
        msg`Newsfeed ads`,
      ],
      value: "managed",
      minSpend: "10,000",
    },
  ];

  return (
    <List
      sx={{ display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap" }}
    >
      {buttons.map((b) => (
        <AccountItemButton key={`account_item_button_${b.value}`} {...b} />
      ))}
    </List>
  );
}

function AccountItemButton({
  title,
  icon,
  description,
  points,
  value,
  minSpend,
}: ChoiceOptions) {
  const theme = useTheme();
  const [, meta, helper] = useField<AccountSetup | undefined>("setup");

  return (
    <ListItemButton
      sx={{
        backgroundColor: "background.default",
        height: 300,
        width: { md: "300px", lg: "350px" },
        borderRadius: "16px",
        border:
          meta.value === value
            ? `4px solid ${theme.palette.primary.main}`
            : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        gap: "10px",
        alignItems: "flex-start",
      }}
      onClick={() => helper.setValue(value)}
      selected={meta.value === value}
    >
      <Box display="flex" flexDirection="column" gap="5px" mt={2}>
        <Typography fontWeight={700} fontSize="20px">
          <TranslateWithId id={title.id} />
        </Typography>
        <Typography variant="caption">
          <TranslateWithId id={description.id} />
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption" fontWeight={600}>
          <Trans>Available Ad placements</Trans>
        </Typography>
        {points.map((p, idx) => (
          <Box
            key={`placements_${idx}`}
            margin={0}
            fontFamily="Poppins"
            fontWeight={400}
            fontSize="0.75rem"
            lineHeight="1.66"
          >
            <TranslateWithId id={p.id} />
          </Box>
        ))}
      </Box>
      <div style={{ flexGrow: 1 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction="column">
          <Typography variant="caption" fontWeight={600}>
            <Trans>Minimum Spend</Trans>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {"$"}
            {minSpend}
            {"/month"}
          </Typography>
        </Stack>
        <Box display="flex" justifyContent="right" alignItems="center">
          {icon}
        </Box>
      </Stack>
    </ListItemButton>
  );
}
