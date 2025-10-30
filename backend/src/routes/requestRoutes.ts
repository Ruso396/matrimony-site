import express from "express";
import { sendInterestRequest, handleRequestResponse, getRequestStatus, getAcceptedMatchesCount, getAllInterestRequests } from "../controllers/requestController";
import { getAllMutualMatches } from "../controllers/requestController";

const router = express.Router();

// POST /api/request/send
router.post("/send", sendInterestRequest);
router.get("/respond", handleRequestResponse);
router.get("/status", getRequestStatus); 
router.get("/all", getAllInterestRequests);

router.get("/accepted-count", getAcceptedMatchesCount);
router.get("/all-matches", getAllMutualMatches);
export default router;
