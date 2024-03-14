## Install

Nance SDK contains types and actions that can be used to interact with [Nance API](https://api.nance.app/api/docs).

If you need React hooks, try [@nance/nance-hooks](https://www.npmjs.com/package/@nance/nance-hooks).

`yarn add @nance/nance-sdk`

## Usage

Actions contains async fetch functions that you can use.

```
import { getProposals } from "@nance/nance-sdk";

// Query proposals of single space
// e.g Search first 8 juicebox proposals which contains keyword "grant" in title or content.
const proposalsPacket = await getProposals({
  space: "juicebox",
  cycle: "All",
  limit: 8,
  keyword: "grant",
  page: 1,
});
```

## Development

```
// Build dist files
yarn build

// Testing package locally before publish
yarn add file:../nance-sdk/packages/core

// Publish
npm publish --access public
```
