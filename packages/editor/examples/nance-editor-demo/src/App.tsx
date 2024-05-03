import { NanceEditor, getMarkdown, setMarkdown } from '@nance/nance-editor';
import "@nance/nance-editor/lib/css/editor.css";
// import "@nance/nance-editor/lib/css/dark.css";

function App() {
  return (
    <div className="App">
      <h1>NANCE-EDITOR DEMO</h1>
      <button onClick={() => alert(getMarkdown())}>Get Markdown</button>
      <button onClick={() => setMarkdown("# Hello Nance Editor!")}>Set Markdown</button>
      <NanceEditor
        initialValue="# Hello Nance Editor!"
        onEditorChange={(md) => console.log(md)}
        fileUploadIPFS={{
          gateway: "https://nance.infura-ipfs.io",
          auth: "Basic ..."
        }}
        // darkMode={true}
      />
    </div>
  );
}

export default App;
