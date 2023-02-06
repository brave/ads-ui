import {ListItemText} from "@mui/material";

interface Props {
  primary: string;
  secondary: string;
}

export function CustomListItemText({ primary, secondary }: Props) {
  return (
    <ListItemText
      sx={{ mt: 2, mb: 2 }}
      primary={primary}
      secondary={secondary}

      primaryTypographyProps={{
        fontSize: "16px",
        fontFamily: "Poppins",
        color: "grey",
      }}

      secondaryTypographyProps={{
        marginTop: "4px",
        fontSize: "18px",
        color: "black",
      }}
    />
  )
}
