// inspired by previous code, and https://blog.logrocket.com/programmatically-downloading-files-browser/
export function triggerBrowserDownload(blob: Blob, suggestedFilename: string) {
  const fileURL = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = suggestedFilename;

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
      removeEventListener("click", clickHandler);
    }, 150);
  };

  link.addEventListener("click", clickHandler, false);
  link.click();
}
