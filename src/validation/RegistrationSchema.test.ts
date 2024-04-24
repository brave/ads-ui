import { produce } from "immer";
import { RegistrationForm } from "@/auth/registration/types";
import { RegistrationSchema } from "@/validation/RegistrationSchema";

const validRegistration: RegistrationForm = {
  advertiser: {
    marketingChannel: "search",
  },
  user: {
    email: `test@brave.com`,
    fullName: "Regular Person",
  },
  mediaSpend: "1000",
  country: "US",
  domain: "brave.com",
};

it("should pass on a valid object", () => {
  RegistrationSchema("search").validateSync(validRegistration);
});

it("should not fail if the domains do not match", () => {
  // as we perform this validation server-side
  const c = produce(validRegistration, (draft) => {
    draft.domain = "basicattentiontoken.com";
  });

  RegistrationSchema("search").validateSync(c);
});

it("should fail if not an email", () => {
  const c = produce(validRegistration, (draft) => {
    draft.domain = "bad.com";
    draft.user.email = "bad.com";
  });

  expect(() => RegistrationSchema("search").validateSync(c)).toThrowError(
    "Please enter a valid email address",
  );
});

it("should fail if not a domain", () => {
  const c = produce(validRegistration, (draft) => {
    draft.domain = "brave";
  });

  expect(() => RegistrationSchema("search").validateSync(c)).toThrowError(
    "Please enter a valid domain, for example: brave.com",
  );
});
