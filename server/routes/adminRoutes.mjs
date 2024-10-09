import express from "express";
import adminController from '../controllers/adminControlelr.mjs'
const adminRouter = express.Router();

adminRouter.post('/login', adminController.adminLogin)
adminRouter.post('/verifyAdmin', adminController.verifyAdmin)
adminRouter.post('/getdashboarddata', adminController.adminDashboardData)
adminRouter.put('/edit', adminController.editUser)
adminRouter.delete('/delete', adminController.deleteUser)
export default adminRouter
