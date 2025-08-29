import mongoose, { Schema, Document } from "mongoose";

export interface WatchedVideo extends Document {
  videoId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  progress : Number;
  videoLength : Number;
  lastWatchedAt: Date;
}

const WatchedVideoSchema = new Schema<WatchedVideo>(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    progress: {
      type: Number, // in seconds
      default: 0,
    },
    videoLength: {
      type: Number, // in seconds (optional)
    },

    lastWatchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

WatchedVideoSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model<WatchedVideo>("WatchedVideo", WatchedVideoSchema);
