interface DownloadParams {
  reportServerPath: string;
  downloadFilename: string;
}

export async function downloadCSV(params: DownloadParams) {
  const res = await fetch(params.reportServerPath, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "text/csv",
    },
  });

  if (!res.ok) {
    throw new Error("Unable to download CSV");
  }

  const blob = await res.blob();
  const file = new Blob([blob], { type: "text/csv", endings: "transparent" });
  const fileURL = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = params.downloadFilename;

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
      link.removeEventListener("click", clickHandler);
    }, 150);
  };

  link.addEventListener("click", clickHandler, false);
  link.click();
}
