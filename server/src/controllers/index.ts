import path, { dirname } from "path";
import fileDirName from "../utils/dirname.ts";
import convertFile from "../utils/convertFile.ts";
import deleteFile from "../utils/deleteFile.ts";
import resizeFile from "../utils/resizeFile.ts";
import cropFile from "../utils/cropFile.ts";
import compressFile from "../utils/compressFile.ts";
import watermarkFile from "../utils/watermarkFile.ts";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import fs, { read } from "fs";
import archiver from "archiver";
import canvas from "canvas";
import faceapi from "face-api.js";
// import Tesseract from "tesseract.js";
// import { franc } from "franc";
// import langs from "langs";
import type { Request, Response, NextFunction, Express } from "express";
import type { FormatEnum, OutputInfo } from "sharp";
import type { DownloadLinksType, EditableMetadata } from "../types/output.ts";
import cropfaceFile from "../utils/cropfaceFile.ts";
import sharp from "sharp";
import { PROFESSIONAL_TEMPLATES } from "../configs/collagePresets.ts";
import { processImageForCell } from "../utils/collageFile.ts";
import { logMemory } from "../utils/memoryCheck.ts";

const { __dirname } = fileDirName(import.meta);

export async function getHomePage(req: Request, res: Response) {
  try {
    const homePageDir = path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "index.html"
    );
    res.sendFile(homePageDir);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// convert

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export async function postConvertImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Tipizacija req.files
    const files = req.files as File[] | { [fieldname: string]: File[] };
    const formats = req.body.formats;

    const isFormatSingle = (index: number) => {
      return typeof formats === "string" ? formats : formats[index];
    };

    // Provera da li su fajlovi prisutni
    if (!files || (Array.isArray(files) && files.length === 0)) {
      // return
      res.status(400).json({ message: "No files uploaded" });
    }

    const downloadLinks: DownloadLinksType[] = [];

    // Ako je req.files objekat sa nizovima fajlova
    if (Array.isArray(files)) {
      // Za slučaj kada je `files` niz fajlova (upload više fajlova)
      for (const [index, file] of files.entries()) {
        const formatedName =
          file.originalname.split(".")[0] + "." + isFormatSingle(index);
        const outputFileDir = path.join(
          __dirname,
          "..",
          "outputs",
          formatedName
        );

        const outputZipDir = path.join(
          __dirname,
          "..",
          "outputsForZip",
          formatedName
        );

        const convertedFile = await convertFile(
          file.path,
          outputFileDir,
          outputZipDir,
          isFormatSingle(index)
        );

        await deleteFile(file.path);
        downloadLinks.push({
          name: formatedName,
          size: convertedFile.size,
          height: convertedFile.height,
          width: convertedFile.width,
          format: convertedFile.format,
        });
      }
    } else {
      // Ako je `files` objekat sa poljima fajlova (npr. kada koristite `fields()` ili `array()` sa više polja)
      for (const fieldname in files) {
        if (Object.prototype.hasOwnProperty.call(files, fieldname)) {
          const fileArray = files[fieldname];
          if (fileArray && fileArray.length > 0) {
            for (const [index, file] of fileArray.entries()) {
              const formatedName =
                file.originalname.split(".")[0] + "." + isFormatSingle(index);
              const outputFileDir = path.join(
                __dirname,
                "..",
                "outputs",
                formatedName
              );

              const outputZipDir = path.join(
                __dirname,
                "..",
                "outputsForZip",
                formatedName
              );

              const convertedFile = await convertFile(
                file.path,
                outputFileDir,
                outputZipDir,
                isFormatSingle(index)
              );

              await deleteFile(file.path);

              downloadLinks.push({
                name: formatedName,
                size: convertedFile.size,
                height: convertedFile.height,
                width: convertedFile.width,
                format: convertedFile.format,
              });
            }
          }
        }
      }
    }
    res.status(201).json({ downloadLinks: downloadLinks, success: true });
  } catch (error) {
    next(error);
  }
}

// resize

type FitOption = "cover" | "contain" | "fill" | "inside" | "outside";

interface ResizeImageOptions {
  width: number;
  height: number;
  fit: FitOption;
  // Dodajte ostale opcije ako ih imate
}

export async function postResizeImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Tipizacija `req.files` kao niz fajlova ili objekat sa nizovima fajlova
    const files = req.files as File[] | { [fieldname: string]: File[] };

    // Tipizacija opcija za sliku
    const imageOptions: ResizeImageOptions = JSON.parse(req.body.imageOptions);

    // Niz za preuzimanje linkova
    const downloadLinks: DownloadLinksType[] = [];

    // Provera da li su fajlovi prisutni
    if (!files || (Array.isArray(files) && files.length === 0)) {
      // return
      res.status(400).json({ message: "No files uploaded" });
    }

    // Ako je req.files niz (array)
    if (Array.isArray(files)) {
      for (const file of files) {
        const outputFileDir = path.join(
          __dirname,
          "..",
          "outputs",
          file.originalname
        );

        const outputZipDir = path.join(
          __dirname,
          "..",
          "outputsForZip",
          file.originalname
        );

        const resizedFile = await resizeFile(
          file.path,
          outputFileDir,
          outputZipDir,
          imageOptions
        );
        await deleteFile(file.path);
        downloadLinks.push({
          name: file.originalname,
          size: resizedFile.size,
          height: resizedFile.height,
          width: resizedFile.width,
          format: resizedFile.format,
        });
      }
    } else {
      // Ako je req.files objekat sa poljima fajlova
      for (const fieldname in files) {
        if (Object.prototype.hasOwnProperty.call(files, fieldname)) {
          const fileArray = files[fieldname];
          if (fileArray && fileArray.length > 0) {
            for (const file of fileArray) {
              // folder for downlaoding files by ID.
              const outputFileDir = path.join(
                __dirname,
                "..",
                "outputs",
                file.originalname
              );

              // folder for zip items
              const outputZipDir = path.join(
                __dirname,
                "..",
                "outputsForZip",
                file.originalname
              );

              const resizedFile = await resizeFile(
                file.path,
                outputFileDir,
                outputZipDir,
                imageOptions
              );
              await deleteFile(file.path);
              downloadLinks.push({
                name: file.originalname,
                size: resizedFile.size,
                height: resizedFile.height,
                width: resizedFile.width,
                format: resizedFile.format,
              });
            }
          }
        }
      }
    }

    // return
    res.status(201).json({ downloadLinks: downloadLinks, success: true });
  } catch (error) {
    next(error);
  }
}

// crop
interface CropImageOptions {
  left: number;
  top: number;
  width: number;
  height: number;
  // Možete dodati još opcija ako ih imate
}

export async function postCropImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Tipizacija `req.files` kao niz fajlova ili objekat sa nizovima fajlova
    const files = req.files as File[] | { [fieldname: string]: File[] };

    // Tipizacija opcija za obrezivanje slike
    const imageOptions: CropImageOptions = JSON.parse(req.body.imageOptions);

    // Niz za preuzimanje linkova
    const downloadLinks: string[] = [];

    // Provera da li su fajlovi prisutni
    if (!files || (Array.isArray(files) && files.length === 0)) {
      // return
      res.status(400).json({ message: "No files uploaded" });
    }

    // Ako je req.files niz (array)
    if (Array.isArray(files)) {
      for (const file of files) {
        const outputFileDir = path.join(
          __dirname,
          "..",
          "outputs",
          file.originalname
        );
        await cropFile(file.path, outputFileDir, imageOptions);
        await deleteFile(file.path);
        downloadLinks.push(file.originalname);
      }
    } else {
      // Ako je req.files objekat sa poljima fajlova
      for (const fieldname in files) {
        if (Object.prototype.hasOwnProperty.call(files, fieldname)) {
          const fileArray = files[fieldname];
          if (fileArray && fileArray.length > 0) {
            for (const file of fileArray) {
              const outputFileDir = path.join(
                __dirname,
                "..",
                "outputs",
                file.originalname
              );
              await cropFile(file.path, outputFileDir, imageOptions);
              await deleteFile(file.path);
              downloadLinks.push(file.originalname);
            }
          }
        }
      }
    }

    // Vraćanje odgovora sa linkovima za preuzimanje
    res.status(200).json({ downloadLinks: downloadLinks, success: true });
  } catch (error) {
    next(error);
  }
}

// compress
interface CompressRequestBody {
  qualityLevel: number;
  convertTo?: keyof FormatEnum;
  greyscale: string;
}

export async function postCompressImage(
  req: Request<{}, {}, CompressRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const files = req.files as File[] | { [fieldname: string]: File[] };
    const { qualityLevel, convertTo, greyscale } = req.body;

    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new ErrorResponse("Please upload file", 400);
    }
    const downloadLinks: DownloadLinksType[] = [];

    const handleFiles = async (fileList: File[]) => {
      for (const file of fileList) {
        const formatedName = convertTo
          ? file.originalname.split(".")[0] + "." + convertTo
          : file.originalname;

        const outputFileDir = path.join(
          __dirname,
          "..",
          "outputs",
          formatedName
        );
        const outputZipDir = path.join(
          __dirname,
          "..",
          "outputsForZip",
          formatedName
        );

        // logMemory(`Before compressing ${formatedName}`);
        const compressedFile = await compressFile(
          file.path,
          outputFileDir,
          outputZipDir,
          qualityLevel,
          convertTo,
          greyscale
        );
        // logMemory(`After compressing ${formatedName}`);

        await deleteFile(file.path);

        downloadLinks.push({
          name: formatedName,
          size: compressedFile.size,
          height: compressedFile.height,
          width: compressedFile.width,
          format: compressedFile.format,
        });
      }
    };

    if (Array.isArray(files)) {
      await handleFiles(files);
    } else {
      for (const fieldname in files) {
        if (Object.prototype.hasOwnProperty.call(files, fieldname)) {
          const fileArray = files[fieldname];
          if (fileArray && fileArray.length > 0) {
            await handleFiles(fileArray);
          }
        }
      }
    }

    res.status(200).json({ success: true, downloadLinks });
  } catch (error) {
    next(error);
  }
}

// Tipizacija tela zahteva (compositePosition)
interface WatermarkRequestBody {
  compositePosition:
    | "topLeft"
    | "bottomLeft"
    | "topRight"
    | "bottomRight"
    | "center";
}

type CompositePositionType =
  | "topLeft"
  | "bottomLeft"
  | "topRight"
  | "bottomRight"
  | "center";

// Funkcija za dodavanje vodenog žiga

export async function postWatermarkingImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Provera da li je req.files definisano i da li je objekat sa nizovima fajlova
    if (!req.files || req.files.length === 0) {
      throw new ErrorResponse("No files were uploaded.", 400);
    }

    let files: Express.Multer.File[] | undefined;
    let inputFile: Express.Multer.File | undefined;

    // logMemory("🔹 Pre početka logike");

    if (Array.isArray(req.files)) {
      files = req.files; // Ako je req.files niz, koristimo ga direktno
    } else {
      files = req.files["files"]; // Ako je objekat, proveravamo polje "files"
      inputFile = req.files["file"] ? req.files["file"][0] : undefined; // Ako postoji "file", uzimamo prvi fajl
    }

    // Provera da li su fajlovi prisutni
    if (!files || files.length === 0) {
      throw new ErrorResponse("No files uploaded for watermarking.", 400);
    }

    if (!inputFile) {
      throw new ErrorResponse("Watermark image is missing.", 400);
    }

    const watermarkOptions = req.body.watermarkOptions; // Pozicija vodeniog žiga
    const parsedOptions = JSON.parse(watermarkOptions);
    console.log("options ===> ", parsedOptions);
    const downloadLinks: string[] = [];

    for (const file of files) {
      const outputFileDir = path.join(
        __dirname,
        "..",
        "outputs",
        file.originalname
      );
      await watermarkFile(
        file.path,
        inputFile.path,
        outputFileDir,
        parsedOptions
      );
      await deleteFile(file.path); // Brisanje originalnog fajla nakon dodavanja vodenog žiga
      downloadLinks.push(file.originalname); // Dodavanje linka za preuzimanje
    }

    // Brisanje fajla sa vodenim žigom
    await deleteFile(inputFile.path);

    // logMemory("🔹 Posle  logike");

    //return
    res.status(200).json({
      success: true,
      message: "Watermarking successful",
      downloadLinks: downloadLinks,
    });
  } catch (error) {
    // Ako je došlo do greške, pozivamo next() da proslijedimo grešku dalje
    console.log(error);
    next(error); // Prosljeđivanje greške u sledeći error handler
  }
}

export async function postCropFace(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      throw new ErrorResponse("No files were uploaded.", 400);
    }

    const downloadLinks: DownloadLinksType[] = [];

    for (const file of files) {
      const outputFileDir = path.join(
        __dirname,
        "..",
        "outputs",
        file.originalname
      );

      // Preprocesiraj sliku
      const preprocessedBuffer = await sharp(file.path)
        .rotate()
        .resize({ width: 800, withoutEnlargement: true })
        .normalize()
        .toBuffer();

      const preprocessedPath = path.join(
        __dirname,
        "..",
        "outputs",
        `pre_${file.originalname}`
      );

      await sharp(preprocessedBuffer).toFile(preprocessedPath);

      // Učitaj i detektuj lice
      const img = await canvas.loadImage(preprocessedBuffer);
      const detections = await faceapi.detectSingleFace(img);

      console.log("Img ===> ", img);
      console.log("detection ===> ", detections);
      if (!detections) {
        await deleteFile(file.path);
        await deleteFile(preprocessedPath);
        downloadLinks.push({
          name: file.originalname,
          error: "No face detected",
        } as DownloadLinksType); // Ako nije detektovano lice, dodaj prazan objekat
        continue;
      }

      const { x, y, width, height } = detections.box;

      // Cropuj sa preprocesirane slike
      const croppedFace = await cropfaceFile(preprocessedPath, outputFileDir, {
        x,
        y,
        width,
        height,
      });

      downloadLinks.push({ name: file.originalname, ...croppedFace });

      await deleteFile(file.path);
      await deleteFile(preprocessedPath); // obriši preprocesiranu verziju
    }

    const allErrors = downloadLinks.every((item) => item.error);

    if (allErrors) {
      throw new ErrorResponse(
        "No faces detected in any of the uploaded files.",
        400
      );
    }

    res.status(200).json({
      success: true,
      message: "Faces cropped successfully",
      downloadLinks,
    });
  } catch (error) {
    next(error);
  }
}

export const postCollageMaker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];

  try {
    const { templateName, customPadding, backgroundColor, borderRadius } =
      req.body;

    const downloadLinks: DownloadLinksType[] & {
      dimensions?: { width: number; height: number };
    } = [];

    logMemory("🔹 Pre početka logike");

    console.log(
      "data ===> ",
      templateName,
      customPadding,
      backgroundColor,
      borderRadius
    );

    if (!files?.length) {
      throw new Error("Minimum 1 image required");
    }

    const template =
      PROFESSIONAL_TEMPLATES[templateName] ||
      PROFESSIONAL_TEMPLATES.INSTAGRAM_GRID;

    if (!template) {
      throw new ErrorResponse("No template", 400);
    }

    const padding =
      typeof customPadding === "string"
        ? parseInt(customPadding)
        : typeof customPadding === "number"
        ? customPadding
        : template.cellPadding || 0;

    const totalCells = template.rows * template.cols;

    const cellWidth = Math.floor(
      (template.width - (padding || 0) * (template.cols + 1)) / template.cols
    );
    const cellHeight = Math.floor(
      (template.height - (padding || 0) * (template.rows + 1)) / template.rows
    );

    logMemory("🔹 Pre obrade slika");

    const processedImages = await Promise.all(
      files
        .slice(0, totalCells)
        .map((file) =>
          processImageForCell(file.path, cellWidth, cellHeight, borderRadius)
        )
    );

    // logMemory("🔹 Posle obrade slika");

    const layers = processedImages.map((buffer, index) => {
      const row = Math.floor(index / template.cols);
      const col = index % template.cols;

      return {
        input: buffer,
        top: row * cellHeight + (padding || 0) * (row + 1),
        left: col * cellWidth + (padding || 0) * (col + 1),
        blend: "over" as const,
      };
    });

    const date = Date.now();

    const outputFilePath = path.join(
      __dirname,
      "..",
      "outputs",
      `collage-${date}.jpg`
    );

    // logMemory("🔹 Pre kreiranja collage-a");

    const processedImage = await sharp({
      create: {
        width: template.width,
        height: template.height,
        channels: 4,
        background: backgroundColor || "#ffffff",
      },
    })
      .composite(layers)
      .jpeg({
        quality: 98,
        mozjpeg: true,
      })
      .toFile(outputFilePath);

    // logMemory("🔹 Posle kreiranja collage-a");

    console.log("Slika ===> ", processedImage);

    downloadLinks.push({
      name: `collage-${date}.jpg`,
      size: (await processedImage).size,
      width: template.width,
      height: template.height,
      format: "jpeg",
    });

    logMemory("✅ Kraj funkcije");

    res.status(200).json({
      success: true,
      downloadLinks: downloadLinks,
      message: "Collage generated successfully",
      dimensions: { width: template.width, height: template.height },
    });
  } catch (error) {
    next(error);
  } finally {
    files.forEach((item) => deleteFile(item.path));
  }
};

import { exiftool, type Tags } from "exiftool-vendored";
import { splitMetadata } from "../utils/splitMetadata.ts";

export const postExtractMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];
  const metadatas: any = [];

  try {
    if (!files) {
      throw new ErrorResponse("No file uploaded", 400);
    }

    for (const file of files) {
      // {
      //         Title,
      //         Description,
      //         Author,
      //         Copyright,
      //         Keywords,
      //         DateTimeOriginal,
      //         CreateDate,
      //         ModifyDate,
      //         GPSLatitude,
      //         GPSLongitude,
      //         GPSAltitude,
      //         Rating,
      //         Quality,
      //         Make,
      //         Model,
      //         FileSource,
      //         Orientation,
      //         ImageWidth,
      //         ImageHeight,
      //         ExifImageHeight,
      //         ExifImageWidth,
      //         Sharpness,
      //         ExifByteOrder,
      //         Mime,
      //         FileName,
      //       }

      const metadata = await exiftool.read(file.path);
      const { readOnly, editable } = splitMetadata(metadata);

      // console.log("Full meta podaci ===> ", Object.entries(metadata).length);
      // console.log(
      //   "Formated meta podaci ===> ",
      //   Object.entries({ ...readOnly, ...editable }).length
      // );

      // const metadataFormatted = {
      //   title: Title,
      //   description: Description,
      //   author: Author,
      //   copyright: Copyright,
      //   keywords: Keywords,
      //   dateTimeOriginal: DateTimeOriginal,
      //   createDate: CreateDate,
      //   modifyDate: ModifyDate,
      //   gpsLatitude: GPSLatitude,
      //   gpsLongitude: GPSLongitude,
      //   gpsAltitude: GPSAltitude,
      //   rating: Rating,

      //   quality: Quality,
      //   make: Make,
      //   model: Model,
      // };

      // console.log("metadata formatted ===> ", metadataFormatted);

      metadatas.push({
        readOnly: readOnly,
        editable: editable,
        fullData: metadata,
      });
    }

    res.status(200).json({ success: true, metadatas: metadatas });
  } catch (error) {
    console.log("Error while reading metadatas from images ===> ", error);
    next(error);
  }
};

// import { createWorker, PSM } from "tesseract.js";

// export const postTextRecognition = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const files = req.files as Express.Multer.File[];
//   const worker = await createWorker("eng+srp");

//   try {
//     const recognizedTexts: string[] = [];

//     for (const file of files) {
//       const processedImageBuffer = await sharp(file.path)
//         .grayscale()
//         .normalize()
//         .threshold(150)
//         .resize({ width: 2000, withoutEnlargement: true })
//         .sharpen()
//         .toBuffer();

//       const {
//         data: { text },
//       } = await worker.recognize(file.path);
//       console.log(formatOCRText(text));

//       recognizedTexts.push(formatOCRText(text));
//     }

//     res.status(200).json({
//       message: "Successful",
//       results: recognizedTexts,
//     });
//   } catch (error) {
//     next(error);
//   } finally {
//     worker.terminate();
//   }
// };

// function formatOCRText(text: string): string {
//   return text
//     .replace(/\n+/g, "\n")
//     .replace(/([а-яА-Яa-zA-Z])\s*-\s*([а-яА-Яa-zA-Z])/g, "$1-$2")
//     .replace(/\s+/g, " ")
//     .replace(/([.,!?])([а-яА-Яa-zA-Z])/g, "$1 $2")
//     .trim();
// }

export function deleteAllFilesInDirectory(directory: string) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Greška prilikom čitanja direktorijuma:", err);
      return;
    }

    files.forEach((file) => {
      if (file !== ".gitkeep") {
        const filePath = path.join(directory, file);

        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Greška prilikom brisanja fajla:", unlinkErr);
          } else {
            console.log("Fajl obrisan:", filePath);
          }
        });
      }
    });
  });
}

// download
export async function getDownloadFileById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fileId } = req.params;
    console.log("File ID ===> ", fileId);
    if (fileId) {
      const filePath = path.join(__dirname, "..", "outputs", fileId);
      console.log("Fajl path ===> ", filePath);
      if (!fs.existsSync(filePath)) {
        throw new ErrorResponse("File not found!", 404);
      }
      res.download(filePath, (error) => {
        if (error) {
          throw new ErrorResponse("Downloading failed", 400);
        }

        fs.unlink(filePath, (error) => {
          if (error) {
            console.log("Greska prilikom brisanja ==> ", error);
            throw new ErrorResponse(error.message, 400);
          } else {
            console.log("File by ID deleted successfully ===> ", filePath);
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getDownloadAllFiles(req: Request, res: Response) {
  try {
    console.log("Downloading all files...");
    const outputsDir = path.join(__dirname, "..", "outputs");
    const outputsForZipDir = path.join(__dirname, "..", "outputsForZip");
    const zipDir = path.join(__dirname, "..", "zipOutput");

    // creating a path to all-files.zip
    const zipFilePath = path.join(zipDir, "all-files.zip");

    // Kreiraj ZIP fajl
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`ZIP fajl kreiran: ${zipFilePath}`);
      res.download(zipFilePath, "all-files.zip", (err) => {
        if (err) {
          console.error("Greška pri preuzimanju:", err);
          res.status(500).json({ error: "Preuzimanje nije uspelo." });
        }
        fs.unlinkSync(zipFilePath); // Obriši ZIP nakon preuzimanja
        deleteAllFilesInDirectory(outputsDir);
        deleteAllFilesInDirectory(outputsForZipDir);
      });
    });

    archive.pipe(output);
    archive.directory(outputsForZipDir, false);
    archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to download files" });
  }
}

export async function deleteAll(req: Request, res: Response) {
  try {
    const outputsDir = path.join(__dirname, "..", "outputs");
    const outputsForZipDir = path.join(__dirname, "..", "outputsForZip");

    deleteAllFilesInDirectory(outputsDir);
    deleteAllFilesInDirectory(outputsForZipDir);

    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error occured", error });
  }
}
