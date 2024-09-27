import crypto from "crypto";
import { currentTime } from "../date/date";

export const CodeToken = {
  code_token: crypto.randomBytes(3).toString("hex"),
  created_at: currentTime,
};
