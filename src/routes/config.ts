import express from "express";
import { get, update } from "../handler";

const router = express.Router();

router.route("/config").get(get).put(update);

export { router };
