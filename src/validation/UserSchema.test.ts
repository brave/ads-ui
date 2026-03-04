import { produce } from "immer";
import { UserSchema } from "./UserSchema";

const validUser = {
  fullName: "Test User",
};

it("should pass on a valid object", () => {
  UserSchema().validateSync(validUser);
});

it("should fail if the full name is invalid", () => {
  const c = produce(validUser, (draft) => {
    draft.fullName = "";
  });

  expect(() => UserSchema().validateSync(c)).toThrowError();
});
