/**
 * Props for the NanceEditor component
 * @property onEditorChange - Callback function triggered when the editor content changes
 * @property initialValue - Initial markdown content for the editor
 * @property fileUploadIPFS - Configuration for Infura IPFS file upload
 * @property externalFileUpload - Function to handle external file uploads
 * @property darkMode - Whether to use dark mode for the editor
 * @property customUploadBlob - Custom function to handle blob uploads
 */

type NanceEditorProps = {
  onEditorChange?: (md: string) => void;
  initialValue?: string;
  fileUploadIPFS?: FileUploadIPFSProps;
  fileUploadExternal?: (blob: Blob | File) => Promise<string>;
  darkMode?: boolean;
  height?: string;
};

type GetMarkdown = () => string | null;
type SetMarkdown = (markdown: string) => void;

type FileUploadIPFSProps = {
  gateway: string;
  auth: string;
}

export { NanceEditorProps, FileUploadIPFSProps, GetMarkdown, SetMarkdown };
