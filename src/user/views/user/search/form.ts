import * as yup from "yup";

export const SearchOptionsSchema = yup.object({
  notes: yup.string().trim().ensure(),
  queryParams: yup
    .array()
    .of(
      yup.object({
        key: yup.string().ensure(),
        value: yup.string().ensure(),
      }),
    )
    .required()
    .default([{ key: "utm_source", value: "brave" }]),
});

export type SearchOptions = yup.InferType<typeof SearchOptionsSchema>;
