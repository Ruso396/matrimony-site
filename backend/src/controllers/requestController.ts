import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { RegisterUser } from "../models/registerUser";
import { PremiumPayment } from "../models/PremiumPaymentModel";
import { InterestRequest } from "../models/InterestRequestModel";

const BASE_URL = "http://localhost:5000"; // 🔁 change to deployed URL if needed

export const sendInterestRequest = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId)
      return res.status(400).json({ message: "Missing senderId or receiverId" });

    const sender = await RegisterUser.findByPk(senderId);
    const receiver = await RegisterUser.findByPk(receiverId);

    if (!sender || !receiver)
      return res.status(404).json({ message: "User not found" });

    // ✅ Check if receiver is premium
    const receiverPremium = await PremiumPayment.findOne({
      where: { userId: receiverId, status: "success" },
    });

    if (!receiverPremium) {
      return res.status(403).json({
        message: "You can send requests only to Premium members.",
      });
    }

    // ✅ Save the request (pending)
    const newRequest = await InterestRequest.create({
      senderId,
      receiverId,
      status: "pending",
    });

    const requestId = newRequest.getDataValue("id"); // ✅ safer access

    // ✅ Accept / Reject URLs
    const acceptUrl = `${BASE_URL}/api/request/respond?requestId=${requestId}&status=accepted`;
    const rejectUrl = `${BASE_URL}/api/request/respond?requestId=${requestId}&status=rejected`;

    // ✅ Construct Email
    const subject = `New Interest Request from ${sender.fullName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Interest Request 💌</h2>
        <p><strong>${sender.fullName}</strong> has shown interest in your profile.</p>
        <p>You can view their profile in the Matrimony site.</p>
        <div style="margin-top: 20px;">
          <a href="${acceptUrl}" style="background-color:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Accept</a>
          <a href="${rejectUrl}" style="background-color:#dc3545;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-left:10px;">Reject</a>
        </div>
        <br/>
        <p style="color: gray; font-size: 12px;">This is an automated message. Please do not reply.</p>
      </div>
    `;

    await sendEmail(receiver.email, subject, "", html);

    return res.status(200).json({ message: "Request email sent successfully" });
  } catch (err) {
    console.error("❌ Error in sendInterestRequest:", err);
    return res.status(500).json({ message: "Error sending request email" });
  }
};


// ✅ Accept or Reject Request
export const handleRequestResponse = async (req: Request, res: Response) => {
  try {
    const requestId = Number(req.query.requestId);
    const status = req.query.status as "accepted" | "rejected";

    if (!requestId || !["accepted", "rejected"].includes(status)) {
      return res.status(400).send("Invalid request or status.");
    }

    const request = await InterestRequest.findByPk(requestId);
    if (!request) return res.status(404).send("Request not found.");

    // ✅ Update status in DB
    await request.update({ status });

    // ✅ Notify sender via email
    const sender = await RegisterUser.findByPk(request.senderId);
    const receiver = await RegisterUser.findByPk(request.receiverId);

    if (sender && receiver) {
      const subject =
        status === "accepted"
          ? `${receiver.fullName} accepted your interest ❤️`
          : `${receiver.fullName} rejected your interest 💔`;

      const message =
        status === "accepted"
          ? `<p>Good news! <strong>${receiver.fullName}</strong> has accepted your interest request. You can now connect with them on the Matrimony site.</p>`
          : `<p>Unfortunately, <strong>${receiver.fullName}</strong> has rejected your interest request. Don’t lose hope — keep looking for your perfect match!</p>`;

      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Interest Request ${status === "accepted" ? "Accepted" : "Rejected"}</h2>
          ${message}
          <br/>
          <p style="color: gray; font-size: 12px;">This is an automated message. Please do not reply.</p>
        </div>
      `;

      await sendEmail(sender.email, subject, "", html);
    }

    return res
      .status(200)
      .send(
        `<h2 style="font-family:Arial;">Request has been ${status} ✅<br/>Email sent to sender.</h2>`
      );
  } catch (err) {
    console.error("❌ Error updating request status:", err);
    return res.status(500).send("Server error");
  }
};


// ✅ Get current request status between two users
export const getRequestStatus = async (req: Request, res: Response) => {
  try {
    const senderId = Number(req.query.senderId);
    const receiverId = Number(req.query.receiverId);

    if (!senderId || !receiverId)
      return res.status(400).json({ message: "Missing senderId or receiverId" });

    const existingRequest = await InterestRequest.findOne({
      where: { senderId, receiverId },
      order: [["createdAt", "DESC"]], // latest request
    });

    if (!existingRequest)
      return res.json({ status: "none" });

    return res.json({ status: existingRequest.status });
  } catch (err) {
    console.error("❌ Error checking request status:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
