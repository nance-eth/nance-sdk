import type { Editor } from "@toast-ui/react-editor";

export const getMarkdown = (editor: Editor) => {
  return editor?.getInstance().getMarkdown() || "";
};

export const setMarkdown = (editor: Editor, markdown: string) => {
  editor.getInstance().setMarkdown(markdown, false);
};

export const insertLink = (editor: Editor, url: string, text: string) => {
  editor.getInstance().exec("addLink", {
    linkUrl: url,
    linkText: text,
  });
};
