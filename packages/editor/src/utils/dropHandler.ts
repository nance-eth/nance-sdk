import { insertLink } from "./editor";
import { uploadBlob } from "./uploadBlob";
import { FileUploadIPFSProps } from "../types";
import { ref } from "../ref";

export const dropHandler = (
  loadingBarFileSize: (size: number) => void,
  fileUploadIPFS?: FileUploadIPFSProps,
  externalFileUpload?: (blob: Blob | File) => Promise<string>
) => {

  const handleFileDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // was running multiple times for some reason

    // if md, set markdown
    const file = e.dataTransfer?.files[0];
    if (file && file.name.toLowerCase().endsWith(".md")) {
      const md = await file.text();
      ref?.current?.getInstance().setMarkdown(md);
    }

    // if pdf, upload to ipfs and insert link
    if (file && file.name.toLowerCase().endsWith(".pdf")) {
      if (fileUploadIPFS.auth) {
        uploadBlob(file, fileUploadIPFS, loadingBarFileSize).then((url) => insertLink(url, file.name));
      } else if (externalFileUpload) {
        loadingBarFileSize(file.size)
        externalFileUpload(file)
      } else return;
    }
  };
  window.addEventListener("drop", handleFileDrop);
};
