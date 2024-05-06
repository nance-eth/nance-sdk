import React, { forwardRef, useImperativeHandle } from "react";
import { Editor } from "@toast-ui/react-editor";
import Loading from "./sub/LoadingBar";
import { uploadBlob, dropHandler, getMarkdown } from "./utils";
import { NanceEditorProps } from "./types";

export const NanceEditor = forwardRef((props: NanceEditorProps, ref: React.MutableRefObject<any>) => {

  const [dropHandlerSetup, setDropHandlerSetup] = React.useState(false);

  const {
    onEditorChange,
    initialValue,
    fileUploadIPFS,
    darkMode,
  } = props;
  
  // setup loading bar
  const {
    Component: LoadingBar,
    loadingBarFileSize,
  } = Loading();

  React.useEffect(() => {
    // setup drop handler, any way to do it without this???
    // Editor onLoad doesn't seem to be ready in time
    if (ref?.current && fileUploadIPFS && !dropHandlerSetup) {
      dropHandler(ref, fileUploadIPFS, loadingBarFileSize);
      setDropHandlerSetup(true);
    }
  }, [ref]);

  return (
    <div>
      <LoadingBar />
      <Editor
        ref={ref}
        usageStatistics={false}
        initialValue={initialValue || " "}
        previewStyle="tab"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => {
          if (onEditorChange) onEditorChange(getMarkdown(ref));
        }}
        hooks={{
          addImageBlobHook(blob, cb) {
            if (!fileUploadIPFS) return;
            uploadBlob(blob, fileUploadIPFS, loadingBarFileSize).then((url) => cb(url));
          },
        }}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
});
