import { NanceEditor } from '@nance/nance-editor';
import "@nance/nance-editor/lib/editor.css";

function App() {
  return (
    <div className="App">
      <h1>NANCE-EDITOR DEMO</h1>
      <NanceEditor
        initialValue="# Hello Nance Editor!"
        onEditorChange={(md) => console.log(md)}
        fileUploadIPFS={{
          gateway: "https://nance.infura-ipfs.io",
          auth: "Basic ..."
        }}
      />
    </div>
  );
}

export default App;
