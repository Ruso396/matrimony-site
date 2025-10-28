import express from "express";
import { sendInterestRequest } from "../controllers/requestController";

const router = express.Router();

// POST /api/request/send
router.post("/send", sendInterestRequest);

export default router;
