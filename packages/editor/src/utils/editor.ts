import { GetMarkdown, SetMarkdown } from "types";
import { ref } from "../ref";

export const getMarkdown: GetMarkdown = () => {
  return ref?.current?.getInstance().getMarkdown();
};

export const setMarkdown: SetMarkdown = (markdown) => {
  ref?.current?.getInstance().setMarkdown(markdown);
};

export const insertLink = (url: string, text: string) => {
  ref?.current?.getInstance().exec("addLink", {
    linkUrl: url,
    linkText: text,
  });
};
