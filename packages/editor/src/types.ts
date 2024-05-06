import type { Editor } from "@toast-ui/react-editor";

type EditorRef = React.MutableRefObject<Editor>;

type NanceEditorProps = {
  onEditorChange?: (md: string) => void;
  initialValue?: string;
  fileUploadIPFS?: FileUploadIPFSProps;
  darkMode?: boolean;
};

type FileUploadIPFSProps = {
  gateway: string;
  auth: string;
}

export { NanceEditorProps, FileUploadIPFSProps, EditorRef };
