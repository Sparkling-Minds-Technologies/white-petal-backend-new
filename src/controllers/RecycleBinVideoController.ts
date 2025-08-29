import { Request, Response } from "express";
import RecycleBinModel from "../models/recycleBin";
import VideoModel from "../models/video";
import { ResponseCode } from "../lib/Utils/ResponseCode";


// Get All Recycle Bin Videos
export const getAllRecycleItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await RecycleBinModel.find().populate(
      "uploadedBy",
      "name email"
    );

    res.status( ResponseCode.SUCCESS).json(items);
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};

// Restore Video
export const restoreVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item = await RecycleBinModel.findById(req.params.id);
    if (!item) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Recycle item not found" });
      return;
    }

    const restoredVideo = new VideoModel({
      courseName: item.courseName,
      courseContent: item.courseContent,
      videoUrl: item.videoUrl,
      thumbnailUrl: item.thumbnailUrl,
      uploadedBy: item.uploadedBy,
      description: item.description,
      status: item.status,
      watchedBy: [],
    });

    await restoredVideo.save();
    await RecycleBinModel.findByIdAndDelete(item._id);

    res
      .status( ResponseCode.SUCCESS)
      .json({ message: "Video restored successfully", restoredVideo });
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};

// Permanently Delete Video from Recycle Bin
export const permanentDeleteVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await RecycleBinModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Recycle item not found" });
      return;
    }

    res
      .status( ResponseCode.SUCCESS)
      .json({ message: "Video permanently deleted from Recycle Bin" });
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};
