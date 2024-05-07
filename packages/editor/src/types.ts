type NanceEditorProps = {
  onEditorChange?: (md: string) => void;
  initialValue?: string;
  fileUploadIPFS?: FileUploadIPFSProps;
  darkMode?: boolean;
};

type GetMarkdown = () => string | null;
type SetMarkdown = (markdown: string) => void;

type FileUploadIPFSProps = {
  gateway: string;
  auth: string;
}

export { NanceEditorProps, FileUploadIPFSProps, GetMarkdown, SetMarkdown };
