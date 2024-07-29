const DB = require("../db/dbConn.js");
const express = require("express");
const multer = require("multer");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const path = require("path");
const imageRouter = express.Router();
const fs = require("fs");

// Function to generate a unique filename based on a string
function generateUniqueFilenameBasedOnString(inputString, originalFilename) {
  const hash = CryptoJS.SHA256(inputString);
  const hex = hash.toString(CryptoJS.enc.Hex);
  const uniqueFilename = `${hex}_${originalFilename}`;
  return uniqueFilename;
}

// Function to generate a random string
function generateRandomString(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const randomString = generateRandomString();
    const uniqueFilename = generateUniqueFilenameBasedOnString(
      randomString,
      file.originalname
    );
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
}).single("image"); // Field name is 'image'

// Wrapper function to use multer with promises
const uploadPromise = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Route for image upload
imageRouter.post("/upload", async (req, res) => {
  try {
    await uploadPromise(req, res);
    if (req.file === undefined) {
      res.send({ message: "No file selected" });
    } else {
      const imgPath = `/uploads/${req.file.filename}`;
      const workId = req.body.index;
      await DB.workImgCreate({ work_id: workId, image_path: imgPath });
      res.send({ filePath: imgPath, message: "File uploaded successfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: err.message });
  }
});

imageRouter.post("/getImages", async (req, res) => {
  const work = req.body;
  var images = [];
  for (let i = 0; i < work.length; i++) {
    let queryResult = await DB.workImgReadByWorkId(work[i].id);
    if (queryResult.exists) {
      images.push(queryResult.work_img);
    } else {
      images.push([]);
    }
  }
  res.send(images);
});

imageRouter.post("/getImages2", async (req, res) => {
  let work_by_artist = [];
  let images_by_artist = [];
  let images = [];

  const artists = req.body;
  for (let i = 0; i < artists.length; i++) {
    images_by_artist = [];
    work_by_artist = await DB.workReadByPortfolioId(artists[i].portfolio_id);
    for (let j = 0; j < work_by_artist.work.length; j++) {
      var img = await DB.workImgReadByWorkId(work_by_artist.work[j].id);
      images_by_artist.push(img.work_img);
    }
    images.push(images_by_artist);
  }
  res.send(images);
});

imageRouter.post("/deleteImage", async (req, res) => {
  try {
    const image = req.body;
    const image_id = image.id;
    await DB.workImgDelete(image_id);
    res.send({
      error: false,
      message: "Deleting work image successfull",
    });
  } catch (err) {
    res.send({
      error: true,
      message: "Deleting work image failed",
    });
  }
});

module.exports = imageRouter;
