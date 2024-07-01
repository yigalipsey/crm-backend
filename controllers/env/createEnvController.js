import Env from "../../models/EnvModel.js";
import User from "../../models/UserModel.js";
import { hashUserPassword } from "../../helpers/bcrypt.js";

export const createEnvController = async (envData) => {
  try {
    const { envCode, envDescription, email } = envData;
    const password = "123456";
    const username = "admin";
    // Basic input validation
    if (!envCode || !envDescription) {
      return {
        err: true,
        msg: "Missing required fields for environment or user",
      };
    }

    const newEnv = new Env({
      envCode,
      envDescription,
    });

    const savedEnv = await newEnv.save();

    // Create the initial admin user for the new environment
    const hashedPassword = hashUserPassword(password);
    const newAdminUser = new User({
      username,
      envId: savedEnv._id,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdminUser.save();

    // Update the saved environment with the adminUserId
    savedEnv.adminUserId = newAdminUser._id;
    await savedEnv.save();

    return {
      success: true,
      message: "Environment and admin user created successfully",
      env: savedEnv,
      adminUser: newAdminUser,
    };
  } catch (error) {
    console.error("Error creating environment:", error);
    if (error.code === 11000) {
      // Duplicate key error (likely envCode)
      return { err: true, msg: "Environment code already exists" };
    } else {
      return { err: true, msg: error.message };
    }
  }
};
