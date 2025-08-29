import { Request, Response } from "express";
import VideoSetting from "../models/VideoSetting";
import { ResponseCode } from "../lib/Utils/ResponseCode";

// CREATE (Only one allowed)
export const createVideoSetting = function (req: Request, res: Response) {
    const { pricePerVideo, maxVideoLength } = req.body;
  
    VideoSetting.findOne({})
      .then(existing => {
        if (existing) {
          return res.status(ResponseCode.BAD_REQUEST).json({ message: "Settings already exist." });
        }
  
        const setting = new VideoSetting({ pricePerVideo, maxVideoLength });
  
        setting.save()
          .then(saved => {
            res.status(201).json({
              message: "Video setting created successfully.",
              data: saved
            });
          })
          .catch(err => res.status(ResponseCode.SERVER_ERROR).json({ message: "Save failed", error: err }));
      })
      .catch(err => res.status(ResponseCode.SERVER_ERROR).json({ message: "Error checking existing settings", error: err }));
  };

// GET All (get first/default setting)
export const getVideoSetting = function (req: Request, res: Response) {
  VideoSetting.findOne({})
    .then(setting => {
      if (!setting) return res.status(ResponseCode.NOT_FOUND).json({ message: "No Video settings found." });
      res.status( ResponseCode.SUCCESS).json(setting);
    })
    .catch(err => res.status(ResponseCode.SERVER_ERROR).json({ message: "Error fetching settings", error: err }));
};

// GET by ID
export const getVideoSettingById = function (req: Request, res: Response) {
  const id = req.params.id;

  VideoSetting.findById(id)
    .then(setting => {
      if (!setting) return res.status(ResponseCode.NOT_FOUND).json({ message: "Video Setting not found." });
      res.status( ResponseCode.SUCCESS).json(setting);
    })
    .catch(err => res.status(ResponseCode.SERVER_ERROR).json({ message: "Error fetching by ID", error: err }));
};

// UPDATE by ID
export const updateVideoSettingById = function (req: Request, res: Response) {
  const id = req.params.id;
  const { pricePerVideo, maxVideoLength } = req.body;

  VideoSetting.findByIdAndUpdate(id, { pricePerVideo, maxVideoLength }, { new: true })
    .then(updated => {
      if (!updated) return res.status(ResponseCode.NOT_FOUND).json({ message: "Video Setting not found to update." });
      res.status( ResponseCode.SUCCESS).json({
         message: "VideoSetting Updated successfully.",
         updated 
        });
    })
    .catch(err => res.status(ResponseCode.SERVER_ERROR).json({ message: "Update by ID failed", error: err }));
};


// DELETE by ID
export const deleteVideoSettingById = function (req: Request, res: Response) {
  const id = req.params.id;

  VideoSetting.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) return res.status(ResponseCode.NOT_FOUND).json({ message: "Video Setting not found to delete." });
      res.status( ResponseCode.SUCCESS).json({ message: "VideoSetting deleted successfully." });
    })
    .catch(err => res.status(ResponseCode.SERVER_ERROR).json({ message: "Delete by ID failed", error: err }));
};


