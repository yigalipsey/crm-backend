import User from "../../models/UserModel.js";
import { hashUserPassword } from "../../helpers/bcrypt.js";

export const createUserController = async (userData) => {
  try {
    const { username, password, envId } = userData;

    // Input validation: Check if required fields are provided
    if (!username || !password || !envId) {
      return { err: true, msg: "Missing required fields" };
    }

    // Check for existing user with the same username in the same environment
    const existingUser = await User.findOne({ username, envId });
    if (existingUser) {
      return { err: true, msg: "Username already exists in this environment" };
    }

    // Hash the password
    const hashedPassword = hashUserPassword(password);

    // Create a new user object
    const newUser = new User({
      username,
      envId,
      password: hashedPassword,
      email: userData.email || null,
      role: userData.role || "user",
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    return { success: true, msg: "User created successfully", user: savedUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { err: true, msg: error.message };
  }
};
