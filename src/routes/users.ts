import express from "express";
import { getUsers } from "../handler";

const router = express.Router();

router.route("/users").get(getUsers);

export { router };
