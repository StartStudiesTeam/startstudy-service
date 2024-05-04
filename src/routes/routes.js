const express = require("express");

const { middlewareSchema } = require("../middlewares/validationJoi");
const { authenticationUser } = require("../middlewares/authenticate");

const Auth = require("../schemas/Auth");
const Login = require("../schemas/Login");
const MailCheck = require("../schemas/Mail");
const NewPassword = require("../schemas/NewPassword");
const CodeToken = require("../schemas/Token");

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

const route = express();

route.post("/signup", middlewareSchema(Auth), registerUser);
route.post("/signin", middlewareSchema(Login), loginUser);
route.post("/mailcheck", middlewareSchema(MailCheck), mailCheck);

route.patch("/codetoken", middlewareSchema(CodeToken), checkTokenValidity);
route.post("/refreshtoken", refreshTokenUser);

route.use(authenticationUser);

route.put("/updateuser", updateUser);
route.delete("/deleteuser", deleteUser);
route.patch("/newpassword", middlewareSchema(NewPassword), newPassword);

route.get("/roadmap", readRoadmap);
route.post("/roadmap", createdRoadmap);
route.put("/roadmap", updateRoadmap);
route.delete("/roadmap", deleteRoadmap);

route.post("/tags", createTag);
route.put("/tags", updateTag);
route.delete("/tags", deleteTag);

route.get("/videos", readVideo);
route.post("/videos", createVideos);
route.put("/videos", updateVideos);
route.delete("/videos", deleteVideo);

route.post("/likes", createLike);
route.put("/likes", updateLike);
route.delete("/likes", deleteLike);

route.post("/bookmarks", createBookmark);
route.put("/bookmarks", updateBookmark);
route.delete("/bookmarks", deleteBookmark);

route.post("/comments", createComments);
route.put("/comments", updateComments);
route.delete("/comments", deleteComments);

module.exports = route;
