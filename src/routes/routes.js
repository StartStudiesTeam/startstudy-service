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
const mailCheck = require("../controllers/mails/mails");
const newPassword = require("../controllers/password/newPassword");
const validationCodeToken = require("../controllers/codeToken/codeToken");
const refreshTokenUser = require("../controllers/users/refresh");
const createdRoadmap = require("../controllers/roadmap/create");
const updateRoadmap = require("../controllers/roadmap/update");
const deleteRoadmap = require("../controllers/roadmap/delete");
const createVideos = require("../controllers/videos/create");
const updateVideos = require("../controllers/videos/update");
const deleteVideo = require("../controllers/videos/delete");
const createLike = require("../controllers/likes/create");
const updateLike = require("../controllers/likes/update");
const deleteLike = require("../controllers/likes/delete");
const updateComments = require("../controllers/comments/update");
const deleteComments = require("../controllers/comments/delete");
const createComments = require("../controllers/comments/create");
const createCommentsComments = require("../controllers/commentsComments/create");
const updateCommentsComments = require("../controllers/commentsComments/update");
const deleteCommentsComments = require("../controllers/commentsComments/delete");

const route = express();

route.post("/signup", middlewareSchema(Auth), registerUser);
route.post("/signin", middlewareSchema(Login), loginUser);
route.post("/mailcheck", middlewareSchema(MailCheck), mailCheck);

route.patch("/codetoken", middlewareSchema(CodeToken), validationCodeToken);
route.post("/refreshtoken", refreshTokenUser);

route.use(authenticationUser);

route.put("/newpassword", middlewareSchema(NewPassword), newPassword);

route.post("/roadmap", createdRoadmap);
route.put("/roadmap", updateRoadmap);
route.delete("/roadmap", deleteRoadmap);

route.post("/videos", createVideos);
route.put("/videos", updateVideos);
route.delete("/videos", deleteVideo);

route.post("/likes", createLike);
route.put("/likes", updateLike);
route.delete("/likes", deleteLike);

route.post("/bookmarks");
route.put("/bookmarks");
route.delete("/bookmarks");

route.post("/comments", createComments);
route.put("/comments", updateComments);
route.delete("/comments", deleteComments);

route.post("/commentsOfComments", createCommentsComments);
route.put("/commentsOfComments", updateCommentsComments);
route.delete("/commentsOfComments", deleteCommentsComments);

module.exports = route;
