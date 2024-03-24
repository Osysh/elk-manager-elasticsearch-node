import express from "express";
import { getStatus } from "../handler/status";

const router = express.Router();

router.route("/status").get(getStatus);

export { router };
