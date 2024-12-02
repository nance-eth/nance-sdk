import React from "react";
import { Editor } from "@toast-ui/react-editor";
import Loading from "./sub/LoadingBar";
import { ref } from "./ref";
import { uploadBlob, dropHandler, getMarkdown } from "./utils";
import { NanceEditorProps } from "./types";

export function NanceEditor(props: NanceEditorProps) {
  const [dropHandlerSetup, setDropHandlerSetup] = React.useState(false);

  const {
    onEditorChange,
    initialValue,
    fileUploadIPFS,
    fileUploadExternal,
    darkMode,
    height = "600px",
  } = props;

  const {
    Component: LoadingBar,
    loadingBarFileSize,
  } = Loading();

  React.useEffect(() => {
    if (ref?.current && fileUploadIPFS && !dropHandlerSetup) {
      dropHandler(loadingBarFileSize, fileUploadIPFS, fileUploadExternal);
      setDropHandlerSetup(true);
    }
  }, []);

  return (
    <div>
      <LoadingBar />
      <Editor
        ref={ref}
        usageStatistics={false}
        initialValue={initialValue || " "}
        previewStyle="tab"
        height={height}
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => {
          if (onEditorChange) onEditorChange(getMarkdown());
        }}
        hooks={{
          addImageBlobHook(blob, cb) {
            if (fileUploadExternal) {
              loadingBarFileSize(blob.size)
              fileUploadExternal(blob).then((url) => cb(url));
            } else if (fileUploadIPFS.auth) {
              uploadBlob(blob, fileUploadIPFS, loadingBarFileSize).then((url) => cb(url));
            } else return;
          },
        }}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  )
};
