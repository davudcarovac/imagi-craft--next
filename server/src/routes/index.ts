import { Router } from "express";
import {
  deleteAll,
  getDownloadAllFiles,
  getDownloadFileById,
  getHomePage,
  postCompressImage,
  postConvertImage,
  postCropImage,
  postResizeImage,
  postWatermarkingImage,
} from "../controllers/index.ts";
import { uploadsMiddleware } from "../middlewares/uploads.ts";
import { uploadsWmMiddleware } from "../middlewares/watermarkUploads.ts";

const router = Router();

router.get("/", getHomePage);
router.post("/convert", uploadsMiddleware, postConvertImage);
router.post("/resize", uploadsMiddleware, postResizeImage);
router.post("/crop", uploadsMiddleware, postCropImage);
router.post("/compress", uploadsMiddleware, postCompressImage);
router.post("/watermark", uploadsWmMiddleware, postWatermarkingImage);

router.get("/download/:fileId", getDownloadFileById);
router.get("/download-all", getDownloadAllFiles);

router.get("/convert-image/delete-all", deleteAll);

export default router;
