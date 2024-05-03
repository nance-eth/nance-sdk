import { ref } from "../ref";

export const getMarkdown = () => {
  return ref?.current?.getInstance().getMarkdown() || "";
};

export const setMarkdown = (markdown: string) => {
  ref?.current?.getInstance().setMarkdown(markdown, false);
};

export const insertLink = (url: string, text: string) => {
  ref?.current?.getInstance().exec("addLink", {
    linkUrl: url,
    linkText: text,
  });
};
