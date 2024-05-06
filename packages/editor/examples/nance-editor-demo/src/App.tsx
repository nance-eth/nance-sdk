import { useRef, useState } from "react";
import { NanceEditor, getMarkdown, setMarkdown } from "@nance/nance-editor";
import "@nance/nance-editor/lib/css/editor.css";
import "@nance/nance-editor/lib/css/dark.css";

function App() {
  const ref = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="App">
      <h1>NANCE-EDITOR DEMO</h1>
      <button onClick={() => alert(getMarkdown(ref))}>Get Markdown</button>
      <button onClick={() => setMarkdown(ref, "# Hello Nance Editor!")}>Set Markdown</button>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <NanceEditor
        ref={ref}
        key={darkMode ? "dark" : "light"}
        initialValue="# Hello Nance Editor!"
        onEditorChange={(md: string) => console.log(md)}
        fileUploadIPFS={{
          gateway: "https://nance.infura-ipfs.io",
          auth: "Basic ..."
        }}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
