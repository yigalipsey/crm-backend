import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  // Check for the presence of the 'Authorization' header
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(chalk.bgGreenBright("err", err));
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid token", code: 401 });
    }

    // Add the decoded user information to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};
