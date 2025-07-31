import { Router } from "express";
import {
  deleteAll,
  getDownloadAllFiles,
  getDownloadFileById,
  postCollageMaker,
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
  changeUsername,
  disableTwoFactor,
  forgotPassword,
  getCsrfToken,
  getGeo,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  removeProfileImg,
  removeTokens,
  resetPassword,
  setupTwoFactor,
  signupUser,
  uploadProfileImg,
  verifyEnableTwoFactor,
  verifyLoginTwoFactor,
} from "../controllers/userController.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { csrfProtection } from "../middlewares/csrfProtection.ts";
import { profileImageUpload } from "../middlewares/profileImageUpload.ts";

const router = Router();

// router.get("/", getHomePage);
router.post("/convert", uploadsMiddleware, postConvertImage);
router.post("/resize", uploadsMiddleware, postResizeImage);
router.post("/crop", uploadsMiddleware, postCropImage);
router.post("/compress", uploadsMiddleware, postCompressImage);
router.post("/watermark", uploadsWmMiddleware, postWatermarkingImage);

// premium
router.post("/crop-face", uploadsMiddleware, postCropFace);
router.post("/collage", uploadsMiddleware, postCollageMaker);

router.get("/download/:fileId", getDownloadFileById);
router.get("/download-all", getDownloadAllFiles);

router.get("/convert-image/delete-all", deleteAll);

// users

router.get("/users", getUsers);
router.get("/user", verifyToken, getUser);

router.get("/csrf-token", csrfProtection);
router.post("/signup", csrfProtection, signupUser);
router.post("/login", csrfProtection, loginUser);
router.post("/logout", logoutUser);
router.post(
  "/upload-profile-image",
  profileImageUpload,
  verifyToken,
  uploadProfileImg
);
router.post("/remove-profile-image", verifyToken, removeProfileImg);

// router.post("/remove-tokens", removeTokens);

router.get("/geo", getGeo);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", verifyToken, changePassword);
router.post("/change-username", verifyToken, changeUsername);

router.post("/2fa/setup", verifyToken, setupTwoFactor);
router.post("/2fa/verify-enable", verifyToken, verifyEnableTwoFactor);
router.post("/2fa/verify-login", csrfProtection, verifyLoginTwoFactor);
router.post("/2fa/disable", verifyToken, disableTwoFactor);

export default router;
