import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import Collection from "../models/userModel.mjs";

export default {
    adminLogin: async (req, res) => {
        try {
            console.log('admin data: ', req.body)
            const { email, password } = req.body

            const emailMatch = email === process.env.ADMIN_EMAIL
            const passwordMatch = password === process.env.ADMIN_PASSWORD

            if(emailMatch && passwordMatch){
                const adminJWT = jwt.sign({email}, String(process.env.JWT_KEY), {
                    expiresIn: "1h",
                })

                res.cookie('jwtToken', adminJWT, {
                    httpOnly: true,
                    secure: false, // becase we are not takin this to production so 'false'
                    maxAge: 3600000,
                })

                res
                .status(200)
                .send({ success: true, message: "Admin Logged in successfully", adminJWT });
            }

        } catch (error) {
            console.log(`Error during Admin Login: ${error.message}`)

            res.status(500).send({ message: 'Internal server error', success: false })
        }
    },

    verifyAdmin: async (req, res) => {
        try {

            const { adminJWT } = req.body

            const verifyJWT = jwt.verify(adminJWT, String(process.env.JWT_KEY));

            if(verifyJWT.email !== process.env.ADMIN_EMAIL){
                return res
                .status(401)
                .send({ success: false, message: "Admin JWT failed to verify" });
            }

            // Optionally, you could return the verified email or other info if needed
            return res.status(200).send({
                success: true,
                message: "Admin JWT verified successfully",
                email: verifyJWT.email // Include the email or any other decoded information if needed
            });
            
        } catch (error) {
            if (error?.message === "invalid signature") {
                return res
                  .status(401)
                  .send({ success: false, message: "Admin JWT failed to verify" });
              }
            console.log(`Error during Admin verify: ${error.message}`)

            res.status(500).send({ message: 'Internal server error', success: false })
        }
    },

    adminDashboardData: async (req, res) => {
        try {

            const { adminJWT } = req.body

            const verifyJWT = jwt.verify(adminJWT, String(process.env.JWT_KEY));

            if(verifyJWT.email !== process.env.ADMIN_EMAIL){
                return res
                .status(401)
                .send({ success: false, message: "Admin JWT failed to verify" });
            }

            const users = await Collection.find({})

            return res
            .status(200)
            .send({ success: true, message: "succesfully fetched data", dashboardData: users })
            
        } catch (error) {
            console.log(`Error during fetching admin dashboard data: ${error.message}`)

            res.status(500).send({ message: 'Internal server error', success: false })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.query;

            // Check if the ID is valid
            if (!userId) {
                return res.status(400).send({ message: 'User ID is required', success: false });
            }
    
            // Find the user and delete
            const result = await Collection.findByIdAndDelete(userId);
    
            // Check if a user was deleted
            if (!result) {
                return res.status(404).send({ message: 'User not found', success: false });
            }
    
            // Return success response
            res.status(200).send({ message: 'User deleted successfully', success: true });
        } catch (error) {
            console.log(`Error during fetching admin dashboard data: ${error.message}`)

            res.status(500).send({ message: 'Internal server error', success: false })
        }
    },

    editUser: async (req, res) => {
        try {

        const { userId } = req.query;
        const { username, email, phone } = req.body;
        console.log('userid: ', userId)

        const updatedUser = await Collection.findByIdAndUpdate(
            userId,
            { 
              username,
              email,
              phone
            },
            { new: true }
          );
        
          if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
        
          return res.status(200).json({ success: true, message: 'User updated successfully', updatedUser });


            
        } catch (error) {
            console.log(`Error during editing user data: ${error.message}`)

            res.status(500).send({ message: 'Internal server error', success: false })
        }
    }
}