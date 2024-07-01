import User from "../../models/UserModel.js";
import { hashUserPassword } from "../../helpers/bcrypt.js";

export const createUserController = async (userData) => {
  try {
    const { username, password, email, role, envId } = userData;
    // Input validation: Check if required fields are provided
    if (!username || !password || !envId) {
      return { err: true, msg: "Missing required fields" };
    }

    // Hash the password
    const hashedPassword = hashUserPassword(data.password);

    // Create a new user object
    const newUser = new User({
      username,
      envId,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    return { success: true, msg: "User created successfully", user: savedUser };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === 11000) {
      // Duplicate key error
      return { err: true, msg: "Username already exists in this environment" };
    } else {
      return { err: true, msg: error.message };
    }
  }
};
