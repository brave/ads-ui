interface Options {
  slug: string;
  hideEstimates: boolean;
  hideBookMeeting: boolean;
}

export function extractOptionsFromUrlSlug(urlSlug: string): Options {
  const slug = urlSlug.substring(0, 15);
  const extra = urlSlug.substring(15);

  return {
    slug,
    hideEstimates: extra.includes("e"),
    hideBookMeeting: extra.includes("m"),
  };
}
