import { compareUserPassword } from "../../helpers/bcrypt.js";
import { User } from "../../models/UserModel.js";
import { generateToken } from "../jwt/generate.js";

export const loginUserController = async (data) => {
  try {
    const { username, password } = data;

    const user = await User.findOne({ username });

    if (!user) {
      return { err: true, msg: "User not found" };
    }
    // check if the user is locked
    else if (user?.locked)
      return {
        err: true,
        code: "103",
        msg: "User is locked",
      };
    else {
      // Check the password (replace this with your actual password validation logic)

      const comparPassword = compareUserPassword(password, user.password);
      if (!comparPassword) {
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
