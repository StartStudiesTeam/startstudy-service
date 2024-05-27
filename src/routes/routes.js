const express = require("express");

const { middlewareSchema } = require("../middlewares/validationJoi");
const { authenticationUser } = require("../middlewares/authenticate");

const Auth = require("../schemas/Auth");
const Login = require("../schemas/Login");
const MailCheck = require("../schemas/Mail");
const NewPassword = require("../schemas/NewPassword");
const CodeToken = require("../schemas/Token");
const Roadmap = require("../schemas/Roadmap");
const Bookmark = require("../schemas/Bookmark");
const Comment = require("../schemas/Comments");
const Like = require("../schemas/Likes");
const Video = require("../schemas/Videos");
const Tag = require("../schemas/Tags");
const Refresh = require("../schemas/Refresh");

const registerUser = require("../controllers/users/register");
const loginUser = require("../controllers/users/login");
const updateUser = require("../controllers/users/update");
const newPassword = require("../controllers/password/newPassword");
const deleteUser = require("../controllers/users/delete");

const mailCheck = require("../controllers/mails/mails");
const checkTokenValidity = require("../controllers/codeToken/codeToken");
const refreshTokenUser = require("../controllers/users/refresh");

const createdRoadmap = require("../controllers/roadmap/create");
const readRoadmap = require("../controllers/roadmap/read");
const updateRoadmap = require("../controllers/roadmap/update");
const deleteRoadmap = require("../controllers/roadmap/delete");

const createVideos = require("../controllers/videos/create");
const readVideo = require("../controllers/videos/read");
const updateVideos = require("../controllers/videos/update");
const deleteVideo = require("../controllers/videos/delete");

const createLike = require("../controllers/likes/create");
const updateLike = require("../controllers/likes/update");
const deleteLike = require("../controllers/likes/delete");

const updateComments = require("../controllers/comments/update");
const deleteComments = require("../controllers/comments/delete");
const createComments = require("../controllers/comments/create");

const createBookmark = require("../controllers/bookmarks/create");
const updateBookmark = require("../controllers/bookmarks/update");
const deleteBookmark = require("../controllers/bookmarks/delete");

const createTag = require("../controllers/tags/create");
const updateTag = require("../controllers/tags/update");
const deleteTag = require("../controllers/tags/delete");
const getAllRoadmaps = require("../controllers/roadmap/getAllRoadmaps");

const route = express();

route.post("/signup", middlewareSchema(Auth), registerUser);
route.post("/signin", middlewareSchema(Login), loginUser);
route.post("/mailcheck", middlewareSchema(MailCheck), mailCheck);

route.patch("/codetoken", middlewareSchema(CodeToken), checkTokenValidity);
route.post("/refreshtoken", middlewareSchema(Refresh), refreshTokenUser);

route.use(authenticationUser);

route.put("/updateuser", updateUser);
route.delete("/deleteuser", middlewareSchema(Auth), deleteUser);
route.patch("/newpassword", middlewareSchema(NewPassword), newPassword);

route.get("/roadmap", middlewareSchema(Roadmap), readRoadmap);
route.get("/roadmaps", getAllRoadmaps);
route.post("/roadmap", middlewareSchema(Roadmap), createdRoadmap);
route.put("/roadmap", middlewareSchema(Roadmap), updateRoadmap);
route.delete("/roadmap", middlewareSchema(Roadmap), deleteRoadmap);

route.post("/tags", middlewareSchema(Tag), createTag);
route.put("/tags", middlewareSchema(Tag), updateTag);
route.delete("/tags", middlewareSchema(Tag), deleteTag);

route.get("/videos", middlewareSchema(Video), readVideo);
route.post("/videos", middlewareSchema(Video), createVideos);
route.put("/videos", middlewareSchema(Video), updateVideos);
route.delete("/videos", middlewareSchema(Video), deleteVideo);

route.post("/likes", middlewareSchema(Like), createLike);
route.put("/likes", middlewareSchema(Like), updateLike);
route.delete("/likes", middlewareSchema(Like), deleteLike);

route.post("/bookmarks", middlewareSchema(Bookmark), createBookmark);
route.put("/bookmarks", middlewareSchema(Bookmark), updateBookmark);
route.delete("/bookmarks", middlewareSchema(Bookmark), deleteBookmark);

route.post("/comments", middlewareSchema(Comment), createComments);
route.put("/comments", middlewareSchema(Comment), updateComments);
route.delete("/comments", middlewareSchema(Comment), deleteComments);

module.exports = route;
