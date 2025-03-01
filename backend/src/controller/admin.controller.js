import { Song } from "../models/song.model.js";
import { ALbum } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

//helper function for cloudinary upload
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    throw new Error("Error uploading to Cloudinary");}
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).send("No files were uploaded.");
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();
    //if songs belogn to nay album upfdate the albums songs array
    if (albumId) {
      await ALbum.findByIdAndUpdate(albumId, {
        $push: {
          songs: song._id,
        },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error creating song:", error);
    next(error);
  }
};
