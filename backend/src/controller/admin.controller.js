import { Song } from "../models/song.model.js";
import { ALbum } from "../models/album.model.js";

export const createSong = async (req, res,next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).send("No files were uploaded.");
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

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
    console.log("Error creating song:",error);
    next(error);
  }
};
