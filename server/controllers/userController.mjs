import Collection from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  // login
  loginPost: async (req, res) => {
    try {
      console.log("req.body: ", req.body);
      const { email, password } = req.body;

      const userFound = await Collection.findOne({ email: email });

      if (!userFound) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid email or password" });
      }

      const isValidpassword = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!isValidpassword) {
        return res
          .status(401)
          .send({ message: "Invalid email or password", success: false });
        // res.status(200).send({ message: 'User Loggined successfully', success: true })
      }

      const userJWT = jwt.sign(
        { email },
        "A7f$X2k#P8zL@R6q*W3m&yC9Vn^T5bJp4!",
        {
          expiresIn: "1h",
        }
      );
      // set token in cookie
      res.cookie("jwtToken", userJWT, {
        httpOnly: true,
        secure: false, // becase we are not takin this to production so 'false'
        maxAge: 3600000,
      });

      res
        .status(200)
        .send({ success: true, message: "Logged in successfully", userJWT });
    } catch (error) {
      console.log(`Error during Login: ${error.message}`);

      res
        .status(500)
        .send({ message: "Internal server error", success: false });
    }
  },

  // signup
  signupPost: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;

      const existUser = await Collection.findOne({ email: email });

      if (existUser) {
        console.log("Exist User");
        return res.status(403).send({ message: `Credentails already exists` });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = {
        username: name,
        email,
        phone,
        password: hashedPassword, // Remember to hash the password before saving it for security
      };

      const savedUser = await Collection.create(newUser);

      const userJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
        expiresIn: "1h",
      });
      // set token in cookie
      res.cookie("jwtToken", userJWT, {
        httpOnly: true,
        secure: false, // becase we are not takin this to production so 'false'
        maxAge: 3600000,
      });

      return res.status(200).send({ success: true, userJWT });
    } catch (error) {
      console.log(`Error during Signup: ${error.message}`);

      res
        .status(500)
        .send({ message: "Internal server error", success: false });
    }
  },

  // Verify User
  verifyUser: async (req, res) => {
    try {
      const { userJWT } = req.body;

      // Verify the JWT
      const verifyJWT = jwt.verify(userJWT, String(process.env.JWT_KEY));

      // Optionally, you could return the verified email or other info if needed
      return res.status(200).send({
        success: true,
        message: "User JWT verified successfully",
        email: verifyJWT.email, // Include the email or any other decoded information if needed
      });
    } catch (error) {
      if (error?.message === "invalid signature") {
        res
          .status(401)
          .send({ success: false, message: "User JWT failed to veify" });
      }
    }
  },

  // fetch userData
  fetchUserData: async (req, res) => {
    try {
      const { userJWT } = req.body;

      const verifyJWT = jwt.verify(userJWT, String(process.env.JWT_KEY));

      const userData = await Collection.findOne({ email: verifyJWT.email });
      console.log("userData:", userData);

      // Optionally, you could return the verified email or other info if needed
      return res.status(200).send({
        success: true,
        message: "User JWT verified successfully",
        email: verifyJWT.email,
        userData: userData,
      });
    } catch (error) {
      console.log(`Error during fetching user: ${error.message}`);

      res
        .status(500)
        .send({ message: "Internal server error", success: false });
    }
  },

  uploadImage: async (req, res) => {
    try {
      const { userJWT } = req.body;

      const verifyJWT = jwt.verify(userJWT, String(process.env.JWT_KEY));

      const userData = await Collection.findOne({ email: verifyJWT.email });

      if (!userData) {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }

      if (!req.file) {
        return res
          .status(400)
          .send({ message: "No file uploaded", success: false });
      }

      userData.image = req.file.filename;
      await userData.save();

      res
        .status(200)
        .send({
          message: "Image uploaded successfully",
          success: true,
          userData,
        });
    } catch (error) {
      console.log(`Error during fetching user: ${error.message}`);

      res
        .status(500)
        .send({ message: "Internal server error", success: false });
    }
  },
};
