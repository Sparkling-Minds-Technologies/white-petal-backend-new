import { Request, Response } from "express";
import GalleryRecycleBin from "../models/GalleryRecyclebin";
import Gallery from "../models/Gallery";
import { ResponseCode } from "../lib/Utils/ResponseCode";

// GET all recycled images
export const getAllRecycleItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await GalleryRecycleBin.find().populate(
      "uploadedBy",
      "name email"
    );

    res.status( ResponseCode.SUCCESS).json({ items });
  } catch (err: any) {
    res.status(ResponseCode.SERVER_ERROR).json({ message: err.message });
  }
};
// POST: Restore image from recycle bin
export const restoreImage = (req: Request, res: Response): void => {
  GalleryRecycleBin.findById(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(ResponseCode.NOT_FOUND).json({ message: "Recycle item not found" });
      }

      const restored = new Gallery({
        imageUrl: item.imageUrl,
        title: item.title,
        schoolName: item.schoolName,
        uploadedBy: item.uploadedBy,
        approved: item.approved,
      });

      restored
        .save()
        .then(() =>
          GalleryRecycleBin.findByIdAndDelete(req.params.id).then(() => {
            res.json({ message: "Image restored", restored });
          })
        )
        .catch((err) =>
          res.status(ResponseCode.SERVER_ERROR).json({ message: "Restore failed", error: err })
        );
    })
    .catch((err) =>
      res.status(ResponseCode.SERVER_ERROR).json({ message: "Restore lookup failed", error: err })
    );
};

// DELETE: Permanently delete a recycled image
export const permanentDeleteImage = (req: Request, res: Response): void => {
  GalleryRecycleBin.findById(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(ResponseCode.NOT_FOUND).json({ message: "Recycle item not found" });
      }

      item
        .deleteOne()
        .then(() => res.json({ message: "Image permanently deleted" }))
        .catch((err) =>
          res
            .status(ResponseCode.SERVER_ERROR)
            .json({ message: "Permanent delete failed", error: err })
        );
    })
    .catch((err) =>
      res.status(ResponseCode.SERVER_ERROR).json({ message: "Delete lookup failed", error: err })
    );
};
