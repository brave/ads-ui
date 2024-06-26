<p align="center">
<img height="50" src="./Subdomains_Rewards_Ads_Default.png"/>
</p>
<br>

Brave Ads Manager is a key component of the ads infrastructure. From the ads manager, advertisers are able to define unique ad campaigns and creatives. Additionally, advertisers can review delivery and engagement metrics on their ad campaigns.

## Tech Stack & Philosophy

`ads-manager` is built with [TypeScript](https://www.typescriptlang.org/) and [React.js](https://reactjs.org/).

Our API requests are constructed as [GraphQL](https://graphql.org/) queries and are then handled by the [Apollo Client](https://www.apollographql.com/docs/react/).

`ads-manager` routing is instrumented by the [React Router](https://github.com/ReactTraining/react-router), and testing is done using the [Jest](https://jestjs.io/) framework.

Our application bundle is created with [webpack](https://webpack.js.org/) and stored on [AWS S3](https://aws.amazon.com/s3/).

This bundle is then served to users as a static asset by [AWS CloudFront CDN](https://aws.amazon.com/cloudfront/).

## pnpm

This project uses [pnpm](pnpm.io). To install, see the [installation instructions](https://pnpm.io/installation). Often this is just a matter of running `corepack enable` to enable node's built-in
support for other package managers.

Then run `pnpm install` to download dependencies.

## Local Development

- Create a `.env.local` file, or update `.env` file provided
- Set `BACKEND_URL=<>` to the endpoint you wish to pull data from.

**Note:**
We are using HTTPS in developer mode so that cookie based authentication works properly.
You may need to proceed through a certificate warning in order to develop locally.

### Generating GraphQL Types:

```
> pnpm codegen
```

## Localization

After changing text, or adding new translated text you need to run:

```
❯ pnpm extract
```

THe output should look something like:

```
> ads-ui@0.1.0 extract
> lingui extract

✔
Catalog statistics for src/locales/{locale}:
┌──────────┬─────────────┬─────────┐
│ Language │ Total count │ Missing │
├──────────┼─────────────┼─────────┤
│ en       │     488     │    0    │
│ es       │     491     │   491   │
│ pt       │     491     │   491   │
└──────────┴─────────────┴─────────┘

(use "pnpm extract" to update catalogs with new messages)
```

This extracts all new messages, and gives a brief glimpse of what you have translated so far.
Once translations are complete, they should be added to the `msgstr` portion of their respective language.

To add more locales, edit the `locales` array in `lingui.config.js` and run `pnpm extract` again.
Make sure you also update `i18n.ts` with the new locale.
