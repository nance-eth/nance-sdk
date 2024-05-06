import { EditorRef } from "types";


export const getMarkdown = (ref: EditorRef) => {
  return ref?.current?.getInstance().getMarkdown() || "";
};

export const setMarkdown = (ref: EditorRef, markdown: string) => {
  ref?.current?.getInstance().setMarkdown(markdown, false);
};

export const insertLink = (ref: EditorRef, url: string, text: string) => {
  ref?.current?.getInstance().exec("addLink", {
    linkUrl: url,
    linkText: text,
  });
};
