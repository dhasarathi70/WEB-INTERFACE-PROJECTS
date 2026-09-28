const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 500 * 1024;
const MIN_DIMENSION = 300;
const MAX_DIMENSION = 2000;

export function validateImageFile(file) {
  if (!file) {
    return { valid: true, message: "" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, message: "Only JPG, JPEG and PNG images are allowed." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, message: "Profile image must be 500 KB or smaller." };
  }

  return new Promise((resolve) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      if (
        image.width < MIN_DIMENSION ||
        image.height < MIN_DIMENSION ||
        image.width > MAX_DIMENSION ||
        image.height > MAX_DIMENSION
      ) {
        resolve({
          valid: false,
          message: "Image dimensions must be between 300×300 and 2000×2000 pixels."
        });
        return;
      }

      resolve({ valid: true, message: "" });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ valid: false, message: "The selected image could not be read." });
    };

    image.src = objectUrl;
  });
}

export function createImagePreview(file) {
  return file ? URL.createObjectURL(file) : "";
}