import { Request, Response } from "express";
import LibraryRecycleBinModel from "../models/LibraryVideoRecycleBinModel";
import LibraryVideo from "../models/LibraryBook"; // Main model
import { ResponseCode } from "../lib/Utils/ResponseCode";

export const getAllLibraryRecycleItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await LibraryRecycleBinModel.find().populate(
      "uploadedBy",
      "name email"
    );

    res.status( ResponseCode.SUCCESS).json(items);
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};
export const restoreLibraryVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item = await LibraryRecycleBinModel.findById(req.params.id);
    if (!item) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Recycle item not found" });
      return;
    }

    const restoredVideo = new LibraryVideo({
      originalVideoId: item._id,
      title: item.title,
      author: item.author,
      subject: item.subject,
      keywords: item.keywords,
      videoUrl: item.videoUrl, // Ensure this field is populated
      coverImage: item.coverImage,
      description: item.description,
      uploadedBy: item.uploadedBy,
      approved: item.approved,
      deletedAt: new Date(),
    });

    await restoredVideo.save();
    await LibraryRecycleBinModel.findByIdAndDelete(item._id);

    res
      .status( ResponseCode.SUCCESS)
      .json({ message: "Video restored successfully", restoredVideo });
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};

export const permanentDeleteLibraryVideo = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const deleted = await LibraryRecycleBinModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "Recycle item not found" }); 
      return;
    }

    res
      .status( ResponseCode.SUCCESS)
      .json({ message: "Library video permanently deleted from Recycle Bin" });
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};
