<p align="center">
<img height="50" src="https://ads.brave.com/static/media/Subdomains_Rewards_Ads_Default.704c7b54.png"/>
</p>
<br>

Brave Ads Manager is a key component of the ads infrastructure. From the ads manager, advertisers are able to define unique ad campaigns and creatives. Additionally, advertisers can review delivery and engagement metrics on their ad campaigns. 

#### Tech Stack & Philosophy 

`ads-manager` is built with [TypeScript](https://www.typescriptlang.org/) and [React.js](https://reactjs.org/). Our API requests are constructed as [GraphQL](https://graphql.org/) queries and are then handled by the [Apollo Client](https://www.apollographql.com/docs/react/). `ads-manager` routing is instrumented by the [React Router](https://github.com/ReactTraining/react-router), and testing is done using the [Jest](https://jestjs.io/) framework. 
Our application bundle is created with [webpack](https://webpack.js.org/) and stored on [AWS S3](https://aws.amazon.com/s3/). This bundle is then served to users as a static asset by [AWS CloudFront CDN](https://aws.amazon.com/cloudfront/). 

React is generally robust in its feature set and is widely supported by the industry with excellent documentation, community support, and libraries. For these reasons we decided to choose React as our primary framework.

However, we are aware of the pitfalls in Virtual DOM based frameworks. Advancements in front end tooling like [Svelte.js](https://svelte.dev/) are appealing given their ability to compile to native js without additional runtime code. However, as of writing, Svelte does not support TypeScript, additionally we lose some of the nicities provided by the React developer ecosystem. 

We will be watching development and adoption of Svelte, especially as we move closer to implementing `ads-manager` as a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

To summarize our philosophy, we wish to architect state-of-the-art software while remaining grounded in practicality. 
