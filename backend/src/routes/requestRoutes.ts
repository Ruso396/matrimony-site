import express from "express";
import { sendInterestRequest, handleRequestResponse, getRequestStatus, getAcceptedMatchesCount } from "../controllers/requestController";

const router = express.Router();

// POST /api/request/send
router.post("/send", sendInterestRequest);
router.get("/respond", handleRequestResponse);
router.get("/status", getRequestStatus); 

router.get("/accepted-count", getAcceptedMatchesCount);
export default router;
