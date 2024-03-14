import React from "react";
import { Editor } from "@toast-ui/react-editor";
import Loading from "./sub/LoadingBar";
import { dropHandler, getMarkdown, uploadBlob } from "./utils";
import { NanceEditorProps } from "./types";

export default function NanceEditor(props: NanceEditorProps) {
  const ref = React.createRef<Editor>()

  const [dropHandlerSetup, setDropHandlerSetup] = React.useState(false);

  const { onEditorChange, initialValue, fileUploadIPFS} = props;
  
  // setup loading bar
  const {
    Component: LoadingBar,
    loadingBarFileSize,
  } = Loading();

  React.useEffect(() => {
    // setup drop handler, any way to do it without this???
    // Editor onLoad doesn't seem to be ready in time
    if (ref.current && fileUploadIPFS && !dropHandlerSetup) {
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
          onEditorChange?.(getMarkdown(ref.current))
        }}
        hooks={{
          addImageBlobHook(blob, cb) {
            if (!fileUploadIPFS) return;
            uploadBlob(blob, fileUploadIPFS, loadingBarFileSize).then((url) => cb(url));
          },
        }}
      />
    </div>
  );
}
