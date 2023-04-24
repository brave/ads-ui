import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import React, { useContext } from "react";
import { DraftContext } from "state/context";
import { useHistory } from "react-router-dom";

interface Props {
  draftId: string;
}

export function DeleteDraft({ draftId }: Props) {
  const { setDrafts } = useContext(DraftContext);
  const history = useHistory();

  return (
    <Tooltip title="Discard Form">
      <IconButton
        onClick={() => {
          localStorage.removeItem(draftId);
          setDrafts();
          history.push("/user/main/campaigns");
        }}
      >
        <DeleteForeverTwoToneIcon color="error" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
}
