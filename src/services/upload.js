import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Uploads a file to either the local server or Firebase Storage.
 * @param {File} file - The file to upload.
 * @param {string} path - The target directory/path.
 * @param {boolean} useFirebase - Whether to use Firebase Storage.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
export async function uploadFile(file, path = 'uploads', useFirebase = true) {
  if (useFirebase) {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } else {
    const formData = new FormData();
    formData.append('file', file);
    // The path can be used as a query param if the server is updated to handle it
    const res = await fetch(`/api/upload?path=${encodeURIComponent(path)}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');

    const data = await res.json();
    return data.url;
  }
}

// Keep the old name for compatibility during migration if needed
export const uploadImage = uploadFile;
