import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    userId: user._id, // Assuming your user object has an "_id" property
    email: user.email,
    type: user.type,
    // Add other user-related information to the payload if needed
  };

  // Set the expiration time to 60 minutes (60 seconds * 60 minutes)
  const expirationTime = 60 * 60;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });

  return token;
};
