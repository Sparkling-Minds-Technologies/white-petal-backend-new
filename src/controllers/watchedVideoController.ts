import { Request, Response } from "express";
import WatchedVideo from "../models/watchedVideo";
import { IUser } from "../models/user";
import { ResponseCode } from "../lib/Utils/ResponseCode";
import { AuthRequest } from "../lib/Utils/types";


function formatProgress(doc: any) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;

  const { progress, videoLength } = obj;
  const watchedPercentage = videoLength && videoLength > 0
    ? Math.min(100, Math.round((progress / videoLength) * 100))
    : 0;

  return { ...obj, watchedPercentage };
}

// Mark Video as Watched
export const markVideoAsWatched = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const { videoId: videoId } = req.params;
    const { progress, videoLength } = req.body;

    if (progress == null || videoLength == null) {
      res.status(ResponseCode.BAD_REQUEST).json({ message: "progress and videoLength are required" });
      return;
    }

    const updated = await WatchedVideo.findOneAndUpdate(
      { userId: req.user.id, videoId },
      {
        progress,
        videoLength,
        lastWatchedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status( ResponseCode.SUCCESS).json({
      message: "Marked as watched",
      watchedVideo: formatProgress(updated),
    });
  } catch (error: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: error.message });
  }
};

// Get Users Who Watched a Video with Progress %
export const getWatchedUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const watchedVideos = await WatchedVideo.find({ videoId: req.params.videoId })
      .populate("userId", "name email profilePicture");

    if (!watchedVideos.length) {
      res.status(ResponseCode.NOT_FOUND).json({ message: "No users have watched this video" });
      return;
    }

    const watchedBy = watchedVideos.map(entry => {
      const formatted = formatProgress(entry);
      return {
        user: entry.userId,
        progress: formatted.progress,
        watchedPercentage: formatted.watchedPercentage,
      };
    });

    res.json({ watchedBy });
  } catch (error: any) {
    res.status(ResponseCode.BAD_REQUEST).json({ message: error.message });
  }
};


// Get All Videos Watched by a User with Progress
export const getUserWatchedVideos = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?._id) {
            res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }

        const watchedVideos = await WatchedVideo.find({ userId: req.user._id })
            .populate("videoId", "title description thumbnailUrl duration") // populate needed video fields
            .sort({ lastWatchedAt: -1 });

        res.json({
            watchedVideos: watchedVideos.map(formatProgress) // include watchedPercentage
        });
    } catch (error: any) {
        res.status(ResponseCode.BAD_REQUEST).json({ message: error.message });
    }
};

export const getRecentWatchedVideos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?._id) {
        res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
    }

    const recent = await WatchedVideo.find({ userId: req.user._id })
      .sort({ lastWatchedAt: -1 })
      .limit(10)
      .populate("videoId"); 

    res.status( ResponseCode.SUCCESS).json(recent.map(formatProgress));
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ error: err.message });
  }
};