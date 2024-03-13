## Install

```bash
yarn add @nance/nance-editor
```
or
```bash
npm install @nance/nance-editor
```

## Usage

```jsx
import { MarkdownEditor } from '@nance/nance-editor';
import "@nance/nance-editor/lib/editor.css";

function App() {
  return (
    <div className="App">
      <p>NANCE-EDITOR DEMO</p>
      <MarkdownEditor
        onEditorChange={(md) => console.log(md)}
      />
    </div>
  );
}

export default App;

```

Optionally, pass in IPFS gateway and Infura projectId and projectSecret as props to the MarkdownEditor component.
This allows the editor to upload images that are dropped into editor or ctrl-v'ed and .pdf's that are dropped into the editor to your IPFS gateway.

```jsx
import { MarkdownEditor } from "@nance/nance-editor";
import "@nance/nance-editor/lib/editor.css";

function App() {
  const fileUploadIPFS = {
    gateway: "https://ipfs.io/ipfs/",
    projectId: "yourInfuraProjectId",
    projectSecret: "yourInfuraProjectSecret"
  };

  return (
    <div className="App">
      <p>NANCE-EDITOR DEMO</p>
      <MarkdownEditor fileUploadIPFS={fileUploadIPFS}/>
    </div>
  );
}

export default App;
```

see [uploadBlob.ts](src/utils/uploadBlob.ts) for more details on upload to IPFS

and [dropHandler.ts](src/utils/dropHandler.ts) for more details on handling file drops

## Development

```bash
yarn build
```

bundled by rollup

see [rollup.config.js](rollup.config.js)
