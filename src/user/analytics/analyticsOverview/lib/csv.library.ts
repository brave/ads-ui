import { Dispatch } from "react";
import axios from "axios";

export const downloadCSV = async (
  campaignId: string,
  campaignName: string,
  userId: string,
  includeCountry: boolean,
  setDownloadingCSV: Dispatch<boolean>
) => {
  setDownloadingCSV(true);

  try {
    const response = await axios(
      `${
        import.meta.env.REACT_APP_SERVER_ADDRESS
      }/report/campaign/csv/${campaignId}`,
      {
        headers: {
          "-x-user": userId,
          "Content-Type": "text/csv",
        },
      }
    );

    const file = new Blob([response.data], {
      type: "text/csv",
      endings: "transparent",
    });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `${campaignName}.csv`);
    document.body.appendChild(link);
    link.click();
  } finally {
    setDownloadingCSV(false);
  }
};
