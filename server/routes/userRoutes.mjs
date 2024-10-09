import express from "express";
import userController from "../controllers/userController.mjs";
import { upload } from "../service/multer.mjs";


const userRouter = express.Router();

userRouter.post('/login', userController.loginPost);
userRouter.post('/signup', userController.signupPost);
userRouter.post('/verifyUser', userController.verifyUser);
userRouter.post('/uploadImage', upload.single('image'), userController.uploadImage)
userRouter.post('/fetchUserData', userController.fetchUserData);

export default userRouter
