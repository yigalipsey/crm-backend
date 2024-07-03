import { compareUserPassword } from "../../helpers/bcrypt.js";
import User from "../../models/UserModel.js";
import { generateToken } from "../jwt/generate.js";

export const loginUserController = async (loginData) => {
  try {
    const { username, password, envId } = loginData;

    const user = await User.findOne({ username, envId });

    if (!user) {
      return { err: true, msg: "User not found in this environment" };
    }

    // check if the user is locked
    else if (user?.locked)
      return {
        err: true,
        code: "103",
        msg: "User is locked",
      };
    else {
      // Check the password
      const comparePassword = compareUserPassword(password, user.password);
      if (!comparePassword) {
        return {
          err: true,
          msg: "Invalid password",
        };
      }

      // Check if the user is active
      if (!user.isActive) {
        return {
          err: true,
          msg: "User is not active. Please activate your account.",
        };
      }

      // Generate a token for the authenticated user
      const token = generateToken(user);
      user.password = "**********";

      return {
        err: false,
        msg: "Login successful",
        token,
        user,
      };
    }
  } catch (error) {
    return { err: true, msg: error.message };
  }
};
