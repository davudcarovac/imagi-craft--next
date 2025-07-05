import multer from "multer";

const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ storage: memoryStorage });

export const profileImageUpload = memoryUpload.single("file");
