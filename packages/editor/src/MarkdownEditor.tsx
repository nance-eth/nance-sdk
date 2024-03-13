import React, { createRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import Loading from "./sub/LoadingBar";
import { dropHandler, getMarkdown, uploadBlob } from "./utils";
import { NanceEditorProps } from "./types";

export default function NanceEditor(props: NanceEditorProps) {
  const ref = createRef<Editor>();
  const { onEditorChange, initialValue, fileUploadIPFS} = props;
  
  // setup loading bar
  const {
    Component: LoadingBar,
    setImageUploading,
    loadingBarFileSize,
  } = Loading();

  dropHandler(ref, fileUploadIPFS);

  return (
    <div>
      <LoadingBar />
      <Editor
        ref={ref}
        initialValue={initialValue || " "}
        previewStyle="tab"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => onEditorChange?.(getMarkdown(ref))}
        hooks={{
          addImageBlobHook(blob, cb) {
            if (!fileUploadIPFS) return;
            const loading = loadingBarFileSize(blob.size);
            uploadBlob(blob, fileUploadIPFS).then((url) => {
              cb(url);
              clearInterval(loading);
              setImageUploading(0);
            });
          },
        }}
      />
    </div>
  );
}
