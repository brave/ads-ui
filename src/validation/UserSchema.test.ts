import { UserSchema } from "./UserSchema";
import { produce } from "immer";

const validUser = {
  email: "test@brave.com",
};

it("should pass on a valid object", () => {
  UserSchema.validateSync(validUser);
});

it("should fail if the campaign format is invalid", () => {
  const c = produce(validUser, (draft) => {
    draft.email = "";
  });

  expect(() => UserSchema.validateSync(c)).toThrowError();
});
