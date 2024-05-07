## Install

```bash
yarn add @nance/nance-editor
```
or
```bash
npm install @nance/nance-editor
```

## Usage

[React example](examples/nance-editor-demo/App.jsx)

[NextJS example (nance-interface)](https://github.com/nance-eth/nance-interface/blob/main/components/ProposalEdit/ProposalEditForm.tsx)

see [uploadBlob.ts](src/utils/uploadBlob.ts) for more details on upload to IPFS

and [dropHandler.ts](src/utils/dropHandler.ts) for more details on handling file drops

## Development

```bash
yarn build
```

bundled by rollup

see [rollup.config.js](rollup.config.js)
