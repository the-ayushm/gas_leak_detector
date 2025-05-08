import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/user.model.js";

dotenv.config({ path: './server/.env' });

 const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token; 
        // console.log("Token:", req.cookies.token);



        if (!token) {
            return res.status(401).json({ message: "Not authorized to access this route" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Payload:", decoded);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token" }); 
        }

        // Make sure the correct key is used
        const user = await User.findById(decoded.userid).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute:", error.message);
        return res.status(401).json({ message: "Authentication failed" });
    }
};
 export default protectRoute
