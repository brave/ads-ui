import { object, string } from "yup";
import { HttpsRegex, NoSpacesRegex, SimpleUrlRegexp } from "validation/regex";
import _ from "lodash";

export const CreativeSchema = object().shape({
  name: string().label("Creative Name").required(),
  type: object().shape({
    code: string()
      .oneOf([
        "notification_all_v1",
        "new_tab_page_all_v1",
        "inline_content_all_v1",
        "search_all_v1",
        "search_homepage_all_v1",
      ])
      .label("Creative Type")
      .required("Creative Type is required"),
    name: string(),
  }),
  state: string()
    .oneOf(["draft", "under_review"])
    .label("State")
    .required()
    .default("draft"),
  targetUrlValid: string().test({
    test: (value) => _.isEmpty(value),
    message: ({ value }) => value,
  }),
  payloadNotification: object()
    .nullable()
    .when("type.code", {
      is: "notification_all_v1",
      then: (schema) =>
        schema.required().shape({
          body: string().label("Body").required().max(60),
          targetUrl: string()
            .label("Target Url")
            .required("URL is required")
            .matches(NoSpacesRegex, `URL must not contain any whitespace`)
            .matches(HttpsRegex, `URL must start with https://`)
            .matches(
              SimpleUrlRegexp,
              `Please enter a valid Ad URL, for example https://brave.com`,
            ),
          title: string().label("Title").required().max(30),
        }),
    }),
});
