import express from "express";

import authenticationUser from "../middlewares/authenticate";

import registerUser from "../controllers/users/register";
import loginUser from "../controllers/users/login";
import updateUser from "../controllers/users/update";
import newPassword from "../controllers/password/newPassword";
import deleteUser from "../controllers/users/delete";

import mailCheck from "../controllers/mails/mails";
import checkTokenValidity from "../controllers/codeToken/codeToken";
import refreshTokenUser from "../controllers/users/refresh";

import createdRoadmap from "../controllers/roadmap/create";
import readRoadmap from "../controllers/roadmap/read";
import updateRoadmap from "../controllers/roadmap/update";
import deleteRoadmap from "../controllers/roadmap/delete";

import createVideos from "../controllers/videos/create";
import readVideo from "../controllers/videos/read";
import updateVideos from "../controllers/videos/update";
import deleteVideo from "../controllers/videos/delete";

import createLike from "../controllers/likes/create";
import updateLike from "../controllers/likes/update";
import deleteLike from "../controllers/likes/delete";

import updateComments from "../controllers/comments/update";
import deleteComments from "../controllers/comments/delete";
import createComments from "../controllers/comments/create";

import createBookmark from "../controllers/bookmarks/create";
import updateBookmark from "../controllers/bookmarks/update";
import deleteBookmark from "../controllers/bookmarks/delete";

import createTag from "../controllers/tags/create";
import updateTag from "../controllers/tags/update";
import deleteTag from "../controllers/tags/delete";
import getAllRoadmaps from "../controllers/roadmap/getAllRoadmaps";

const route = express();

route.post("/signup", registerUser);
route.post("/signin", loginUser);
route.post("/mailcheck", mailCheck);

route.patch("/codetoken", checkTokenValidity);
route.post("/refreshtoken", refreshTokenUser);

route.use(authenticationUser);

route.put("/updateuser", updateUser);
route.delete("/deleteuser", deleteUser);
route.patch("/newpassword", newPassword);

route.get("/roadmap", readRoadmap);
route.get("/roadmaps", getAllRoadmaps);
route.post("/roadmap", createdRoadmap);
route.put("/roadmap", updateRoadmap);
route.delete("/roadmap", deleteRoadmap);

route.post("/tag", createTag);
route.put("/tag", updateTag);
route.delete("/tag", deleteTag);

route.get("/video", readVideo);
route.post("/video", createVideos);
route.put("/video", updateVideos);
route.delete("/video", deleteVideo);

route.post("/like", createLike);
route.put("/like", updateLike);
route.delete("/like", deleteLike);

route.post("/bookmark", createBookmark);
route.put("/bookmark", updateBookmark);
route.delete("/bookmark", deleteBookmark);

route.post("/comment", createComments);
route.put("/comment", updateComments);
route.delete("/comment", deleteComments);

export default route;
