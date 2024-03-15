
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

export { NanceEditorProps, FileUploadIPFSProps };
