import { Router } from "express";
import {
  deleteAll,
  getDownloadAllFiles,
  getDownloadFileById,
  // getHomePage,
  postCompressImage,
  postConvertImage,
  postCropFace,
  postCropImage,
  postResizeImage,
  postWatermarkingImage,
} from "../controllers/index.ts";
import { uploadsMiddleware } from "../middlewares/uploads.ts";
import { uploadsWmMiddleware } from "../middlewares/watermarkUploads.ts";
import {
  forgotPassword,
  getUsers,
  loginUser,
  signupUser,
} from "../controllers/userController.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";

const router = Router();

// router.get("/", getHomePage);
router.post("/convert", uploadsMiddleware, postConvertImage);
router.post("/resize", uploadsMiddleware, postResizeImage);
router.post("/crop", uploadsMiddleware, postCropImage);
router.post("/compress", uploadsMiddleware, postCompressImage);
router.post("/watermark", uploadsWmMiddleware, postWatermarkingImage);

// premium
router.post("/crop-face", uploadsMiddleware, postCropFace);

router.get("/download/:fileId", getDownloadFileById);
router.get("/download-all", getDownloadAllFiles);

router.get("/convert-image/delete-all", deleteAll);

// users

router.get("/users", getUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

export default router;
