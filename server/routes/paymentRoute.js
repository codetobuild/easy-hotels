import express from "express";
import * as payment from "../controllers/payment";

const router = express.Router();

router.post("/order", payment.order);
router.post("/verify", payment.order);

export default router;
