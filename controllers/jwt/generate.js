import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
    envId: user.envId,
  };

  // Set the expiration time to 60 minutes (60 seconds * 60 minutes)
  const expirationTime = 60 * 60 * 24 * 7;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });

  return token;
};
