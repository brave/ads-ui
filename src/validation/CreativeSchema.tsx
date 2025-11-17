import { object, string } from "yup";
import { HttpsRegex, NoSpacesRegex, SimpleUrlRegexp } from "@/validation/regex";
import _ from "lodash";
import * as Yup from "yup";

const validTargetUrl = () =>
  Yup.string()
    .required("Target URL is a required field")
    .matches(NoSpacesRegex, "URL must not contain any whitespace")
    .matches(HttpsRegex, "URL must start with https://")
    .matches(
      SimpleUrlRegexp,
      "Please enter a valid URL, for example https://brave.com",
    );

export const CreativeSchema = () =>
  object().shape({
    name: string().required("Ad Name is required"),
    type: object().shape({
      code: string()
        .oneOf(["notification_all_v1"], "Ad type must be notification")
        .required("Ad type is required"),
      name: string(),
    }),
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
            body: string()
              .required("Ad body is required")
              .max(60, "Ad body must be less than 60 characters"),
            targetUrl: validTargetUrl(),
            title: string()
              .required("Ad title is required")
              .max(30, "Ad title must be less than 30 characters"),
          }),
      }),
  });
