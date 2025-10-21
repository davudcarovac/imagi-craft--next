import { Router } from "express";
import {
  deleteAll,
  getDownloadAllFiles,
  getDownloadFileById,
  postCollageMaker,
  postCompressImage,
  postConvertImage,
  postCropFace,
  postCropImage,
  postEditMetadata,
  postExtractMetadata,
  postResizeImage,
  // postTextRecognition,
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
  getRefreshToken,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  removeProfileImg,
  resetPassword,
  setupTwoFactor,
  signupUser,
  uploadProfileImg,
  verifyEmail,
  verifyEnableTwoFactor,
  verifyLoginTwoFactor,
} from "../controllers/userController.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";
import { csrfProtection } from "../middlewares/csrfProtection.ts";
import { profileImageUpload } from "../middlewares/profileImageUpload.ts";
import { uploadLimiter } from "../middlewares/uploadLimiter.ts";

const router = Router();

// router.get("/", getHomePage);

// premium

router.get("/download/:fileId", getDownloadFileById);
router.get("/download-all", getDownloadAllFiles);

router.get("/convert-image/delete-all", deleteAll);

// users

router.get("/users", getUsers);
router.get("/user", verifyToken, getUser);

router.get("/csrf-token", csrfProtection, getCsrfToken);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);

router.post("/refresh-token", getRefreshToken);

router.post("/logout", csrfProtection, verifyToken, logoutUser);
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
router.post("/change-password", verifyToken, csrfProtection, changePassword);
router.post("/change-username", verifyToken, csrfProtection, changeUsername);

router.post("/2fa/setup", verifyToken, csrfProtection, setupTwoFactor);
router.post(
  "/2fa/verify-enable",
  verifyToken,
  csrfProtection,
  verifyEnableTwoFactor
);
router.post("/2fa/verify-login", verifyLoginTwoFactor);
router.post("/2fa/disable", verifyToken, csrfProtection, disableTwoFactor);

router.post("/convert", uploadsMiddleware, uploadLimiter, postConvertImage);
router.post("/resize", uploadsMiddleware, uploadLimiter, postResizeImage);
router.post("/crop", uploadsMiddleware, uploadLimiter, postCropImage);
router.post("/compress", uploadsMiddleware, uploadLimiter, postCompressImage);
router.post(
  "/watermark",
  uploadsWmMiddleware,
  uploadLimiter,
  postWatermarkingImage
);

// premium
router.post("/crop-face", uploadsMiddleware, postCropFace);
router.post("/collage", uploadsMiddleware, postCollageMaker);
router.post("/extract-metadata", uploadsMiddleware, postExtractMetadata);
router.post("/edit-metadata", uploadsMiddleware, postEditMetadata);

// router.post("/text-recognition", uploadsMiddleware, postTextRecognition);

export default router;
