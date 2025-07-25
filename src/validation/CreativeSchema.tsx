import { object, string } from "yup";
import { HttpsRegex, NoSpacesRegex, SimpleUrlRegexp } from "@/validation/regex";
import _ from "lodash";
import * as Yup from "yup";
import { t } from "@lingui/macro";

const validTargetUrl = () =>
  Yup.string()
    .required(t`Target URL is a required field`)
    .matches(NoSpacesRegex, t`URL must not contain any whitespace`)
    .matches(HttpsRegex, t`URL must start with https://`)
    .matches(
      SimpleUrlRegexp,
      t`Please enter a valid URL, for example https://brave.com`,
    );

export const CreativeSchema = () =>
  object().shape({
    name: string().required(t`Ad Name is required`),
    type: object().shape({
      code: string()
        .oneOf(["notification_all_v1"], t`Ad type must be notification`)
        .required(t`Ad type is required`),
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
              .required(t`Ad body is required`)
              .max(60, t`Ad body must be less than 60 characters`),
            targetUrl: validTargetUrl(),
            title: string()
              .required(t`Ad title is required`)
              .max(30, t`Ad title must be less than 30 characters`),
          }),
      }),
  });
