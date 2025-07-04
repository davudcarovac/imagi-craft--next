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
  changePassword,
  forgotPassword,
  getCsrfToken,
  getGeo,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  resetPassword,
  signupUser,
} from "../controllers/userController.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { csrfProtection } from "../middlewares/csrfProtection.ts";

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
router.get("/user", verifyToken, getUser);

router.post("/signup", csrfProtection, signupUser);
router.post("/login", csrfProtection, loginUser);
router.post("/logout", logoutUser);
router.get("/csrf-token", csrfProtection, getCsrfToken);
router.get("/geo", getGeo);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", verifyToken, changePassword);

export default router;
