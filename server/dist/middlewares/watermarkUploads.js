import multer from "multer";
import fileDirName from "../utils/dirname.js";
import path from "path";
const { __dirname } = fileDirName(import.meta);
const uploadDirPath = path.join(__dirname, "../uploads");
const uploadWmDirPath = path.join(__dirname, "../uploadsWm");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "files") {
            cb(null, uploadDirPath);
        }
        else if (file.fieldname === "file") {
            cb(null, uploadWmDirPath);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });
export const uploadsWmMiddleware = upload.fields([
    { name: "files", maxCount: 10 },
    { name: "file", maxCount: 1 },
]);
