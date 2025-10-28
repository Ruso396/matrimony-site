import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { RegisterUser } from "../models/registerUser";

export const sendInterestRequest = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId)
      return res.status(400).json({ message: "Missing senderId or receiverId" });

    // ✅ Get sender and receiver info from DB
    const sender = await RegisterUser.findByPk(senderId);
    const receiver = await RegisterUser.findByPk(receiverId);

    if (!sender || !receiver)
      return res.status(404).json({ message: "User not found" });

    // ✅ Construct the email
    const subject = `New Interest Request from ${sender.fullName}`;
    const text = `${sender.fullName} has shown interest in your profile.`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Interest Request 💌</h2>
        <p><strong>${sender.fullName}</strong> has shown interest in your profile.</p>
        <p>You can view their profile in the Matrimony site.</p>
        <br/>
        <p style="color: gray; font-size: 12px;">This is an automated message. Please do not reply.</p>
      </div>
    `;

    // ✅ Send the email
    await sendEmail(receiver.email, subject, text, html);

    return res.status(200).json({ message: "Request email sent successfully" });
  } catch (err) {
    console.error("❌ Error in sendInterestRequest:", err);
    return res.status(500).json({ message: "Error sending request email" });
  }
};
