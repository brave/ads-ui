interface Options {
  slug: string;
  hideEstimates: boolean;
  hideBookMeeting: boolean;
}

export function extractOptionsFromUrlSlug(urlSlug: string): Options {
  /*
  Why this logic?
  
  Currently only ever create slugs that are 15 characters long, but we might want to change that
  in the future. We don't use look-alike letters (e.g. "o" and "l") in the slugs nowadays, but we did 
  in the past. 

  So:
  - assume that any new slugs that may be longer than 15 characters will not have look-alike letters
  - we can therefore safely parse an 0 and l from the suffix if it's longer that 15 characters
  */

  const baseSlug = urlSlug.substring(0, 15);
  const extra = urlSlug.substring(15);

  const filterdExtra = extra.replace(/[0l]/g, "");

  return {
    slug: baseSlug + filterdExtra,
    hideEstimates: extra.includes("0"),
    hideBookMeeting: extra.includes("l"),
  };
}
