const { DEFAULT_SCALARS } = require("@graphql-codegen/visitor-plugin-common");
const MAYBE_SIGNATURE = `export type Maybe<T> = T | null;`;
const INPUT_MAYBE_SIGNATURE = `export type InputMaybe<T> = Maybe<T>;`
const EXACT_SIGNATURE = `export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };`;

module.exports = {
  plugin(schema, documents, config, info) {
    const extraTypes = [
      MAYBE_SIGNATURE,
      INPUT_MAYBE_SIGNATURE,
      EXACT_SIGNATURE,
    ];

    let scalars = `export type Scalars = {${Object.entries(DEFAULT_SCALARS).map((v) => `${v[0]}: ${v[1]}`)}}`;
    extraTypes.push(scalars);

    return extraTypes.join('\n')
  }
}
