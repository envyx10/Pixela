/**
 * Redimensiona una imagen manteniendo su relación de aspecto.
 * @param {File} file - Archivo de imagen original.
 * @param {number} maxSize - Tamaño máximo en píxeles (ancho o alto).
 * @returns {Promise<string>} Promesa que resuelve con la imagen redimensionada en formato base64 (JPEG).
 */
export const resizeImage = (
  file: File,
  maxSize: number = 300,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = () =>
          reject(new Error("Failed to load image for resizing"));
        img.src = e.target.result as string;
      } else {
        reject(new Error("FileReader result is empty"));
      }
    };
    reader.onerror = () =>
      reject(reader.error || new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};
