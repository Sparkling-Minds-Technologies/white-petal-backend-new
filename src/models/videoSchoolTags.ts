import mongoose, { Document, Schema } from "mongoose";

export interface IVideoSchoolTags extends Document {
  videoId: mongoose.Types.ObjectId;
  schoolId: mongoose.Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchoolTagsSchema = new Schema<IVideoSchoolTags>(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Create a compound unique index on (videoId, schoolId)
VideoSchoolTagsSchema.index({ videoId: 1, schoolId: 1 }, { unique: true });

const VideoSchoolTagsModel = mongoose.model<IVideoSchoolTags>(
  "VideoSchoolTags",
  VideoSchoolTagsSchema
);

export default VideoSchoolTagsModel;
