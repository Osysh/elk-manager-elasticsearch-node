import express from "express";
import { handle_actions } from "../handler";

const router = express.Router();

router.route("/action").post(handle_actions);

export { router };
