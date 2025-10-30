import express from "express";
import { sendInterestRequest, handleRequestResponse, getRequestStatus, getAllInterestRequests } from "../controllers/requestController";
import { getAllMutualMatches } from "../controllers/requestController";

const router = express.Router();

// POST /api/request/send
router.post("/send", sendInterestRequest);
router.get("/respond", handleRequestResponse);
router.get("/status", getRequestStatus); 
router.get("/all", getAllInterestRequests);

router.get("/all-matches", getAllMutualMatches);
export default router;
