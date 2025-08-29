import { Request, Response } from "express";
import { ProgramRequestModel } from "../models/Program";
import { ResponseCode } from "../lib/Utils/ResponseCode";
import { AuthRequest } from "../lib/Utils/types";

export const requestProgram = async (req: AuthRequest, res: Response) => {
    try {
        const { contactPerson, email, phone, programRequested, message } = req.body;

        const newRequest = new ProgramRequestModel({
            schoolName: req.user?.name,
            contactPerson,
            schoolID: req.user?.id,
            email,
            phone,
            programRequested,
            message,
            requestedBy: req.user?.id, // Assuming req.user is populated
        });

        await newRequest.save();
        res.status(201).json({ message: "Program request submitted successfully", data: newRequest });
    } catch (error) {
        console.log("errrr",error)
        res.status(ResponseCode.SERVER_ERROR).json({ message: "Server error, some feilds are missing" });
    }
};


export const getAllProgramRequests = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role == "school") {
            const requests = await ProgramRequestModel.find({ schoolID: req.user?.id });

            res.json({ message: "Program requests retrieved", data: requests });
        } else {
            const requests = await ProgramRequestModel.find({ status: "pending" }).populate("requestedBy", "name email");
            res.json({ message: "Program requests retrieved", data: requests });
        }
    } catch (error) {
        res.status(ResponseCode.SERVER_ERROR).json({ message: "Server error" });
    }
};


export const updateProgramStatus = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log("id---",id,status)

        if (!["approved", "rejected"].includes(status)) {
            res.status(ResponseCode.BAD_REQUEST).json({ message: "Invalid status value" });
            return;
        }

        const updatedRequest = await ProgramRequestModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        console.log("in loggsss",updatedRequest)
        if (!updatedRequest) {
            res.status(ResponseCode.NOT_FOUND).json({ message: "Program request not found" });
            return
        }

        res.json({ message: `Program request ${status}`, data: updatedRequest });
    } catch (error) {
        res.status(ResponseCode.SERVER_ERROR).json({ message: "Server error" });
    }
};
