import express from "express";
import {
  sendInterestRequest,
  handleRequestResponse,
  getRequestStatus,
  getAcceptedMatchesCount,
  getAllInterestRequests,
  getAllMutualMatches,
  getReceivedRequests,
  getNotificationCount,
  getSentInterestCount,
} from "../controllers/requestController";

const router = express.Router();

// ✅ Send Interest Request
router.post("/send", sendInterestRequest);

// ✅ Accept or Reject Request
router.get("/respond", handleRequestResponse);

// ✅ Get Request Status (between two users)
router.get("/status", getRequestStatus);

// ✅ Get All Interest Requests (Admin)
router.get("/all", getAllInterestRequests);

// ✅ Get Accepted Matches Count
router.get("/accepted-count", getAcceptedMatchesCount);

// ✅ Get All Mutual Matches (Admin View)
router.get("/all-matches", getAllMutualMatches);

// ✅ Get Requests Received by Specific User
router.get("/received/:userId", getReceivedRequests);

// ✅ Get Pending Notification Count
router.get("/notifications/:userId", getNotificationCount);

// ✅ Get Sent Interest Count
router.get("/sentcount/:userId", getSentInterestCount);

export default router;
