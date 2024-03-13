import { FileUploadIPFSProps } from "../types";

const API = ":5001/api/v0";

// https://github.com/jbx-protocol/juice-interface/blob/main/src/lib/infura/ipfs.ts
export async function uploadBlob(blob: Blob, fileUploadIPFS: FileUploadIPFSProps) {
  const { gateway, auth } = fileUploadIPFS;

  const formData = new FormData();
  formData.append("file", blob);

  try {
    const response = await fetch(`${gateway}${API}/add`, {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    const cid = data.Hash;
    const url = `${gateway}/ipfs/${cid}`;
    return url;
  } catch (error) {
    return Promise.reject(error);
  }
}
