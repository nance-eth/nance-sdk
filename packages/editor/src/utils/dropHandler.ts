import { Editor } from "@toast-ui/react-editor";
import { RefObject } from "react";
import { setMarkdown, insertLink } from "./editor";
import { uploadBlob } from "./uploadBlob";
import { FileUploadIPFSProps } from "../types";

export const dropHandler = (
  editorRef: RefObject<Editor>,
  fileUploadIPFS: FileUploadIPFSProps,
  loadingBarFileSize: (size: number) => void
) => {

  const editor = editorRef.current;

  const handleFileDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // was running multiple times for some reason

    // if md, set markdown
    const file = e.dataTransfer?.files[0];
    if (file && file.name.toLowerCase().endsWith(".md")) {
      const md = await file.text();
      setMarkdown(editor, md);
    }

    // if pdf, upload to ipfs and insert link
    if (file && file.name.toLowerCase().endsWith(".pdf")) {
      uploadBlob(file, fileUploadIPFS, loadingBarFileSize).then((url) => insertLink(editor, url, file.name));
    }
  };
  window.addEventListener("drop", handleFileDrop);
};
