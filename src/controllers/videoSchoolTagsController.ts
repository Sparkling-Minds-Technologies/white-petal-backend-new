import { Request, Response } from "express";
import { ResponseCode } from "../lib/Utils/ResponseCode";
import VideoSchoolTagsModel from "../models/videoSchoolTags";

export const createVideoSchoolTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoId, schoolId, tags } = req.body;

    const newTag = await VideoSchoolTagsModel.create({ videoId, schoolId, tags });

    res.status(ResponseCode.SUCCESS).json(newTag);
  } catch (error: any) {
    // Handle duplicate key error (unique videoId + schoolId)
    if (error.code === 11000) {
      res.status(ResponseCode.CONFLICT).json({
        message: "A tag entry for this video and school already exists",
      });
      return;
    }

    // Other errors
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};


export const getAllVideoSchoolTags = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tags = await VideoSchoolTagsModel.find()
      .select("videoId schoolId tags") // select only required fields
      .populate("schoolId", "name email role"); // optional: keep school info

    // Map to return only videoId, schoolId, and tags
    const result = tags.map((t) => ({
      videoId: t.videoId,
      schoolId: t.schoolId,
      tags: t.tags,
    }));

    res.status(ResponseCode.SUCCESS).json({ videoSchoolTags: result });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

export const getVideoSchoolTagById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tag = await VideoSchoolTagsModel.findById(req.params.id)
      .select("videoId schoolId tags") // select only needed fields
      .populate("schoolId", "name email role"); // optional: populate basic school info

    if (!tag) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "VideoSchoolTag not found" });
      return;
    }

    // Return minimal format
    const result = {
      videoId: tag.videoId,
      schoolId: tag.schoolId,
      tags: tag.tags,
    };

    res.status(ResponseCode.SUCCESS).json({ videoSchoolTag: result });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

export const updateVideoSchoolTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await VideoSchoolTagsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "VideoSchoolTag not found" });
    }
    res.status(ResponseCode.SUCCESS).json(updated);
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteVideoSchoolTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await VideoSchoolTagsModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "VideoSchoolTag not found" });
    }
    res
      .status(ResponseCode.SUCCESS)
      .json({ message: "Deleted successfully" });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

export const getTagsByVideoAndSchool = async (req: Request, res: Response) => {
  try {
    const { videoId, schoolId } = req.query;

    if (!videoId || !schoolId) {
      return res
        .status(ResponseCode.BAD_REQUEST)
        .json({ message: "videoId and schoolId are required" });
    }

    const tags = await VideoSchoolTagsModel.find({
      videoId,
      schoolId,
    }).select("tags -_id");

    if (!tags || tags.length === 0) {
      return res
        .status(ResponseCode.NOT_FOUND)
        .json({ message: "No tags found for given video and school" });
    }

    res.status(ResponseCode.SUCCESS).json(tags);
  } catch (error: any) {
    res
      .status(ResponseCode.SERVER_ERROR)
      .json({ message: error.message });
  }
};