import { MarkdownEditor } from '@nance/nance-editor';
import "@nance/nance-editor/lib/editor.css";

function App() {
  return (
    <div className="App">
      <h1>NANCE-EDITOR DEMO</h1>
      <MarkdownEditor
        initialValue="# Hello Nance Editor!"
        onEditorChange={(md) => console.log(md)}
      />
    </div>
  );
}

export default App;
