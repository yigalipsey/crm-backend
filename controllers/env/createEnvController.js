import Env from "../../models/EnvModel.js";

export const createEnvController = async (envData) => {
  try {
    const { envCode, envDescription } = envData;

    // Basic input validation
    if (!envCode || !envDescription) {
      return { err: true, msg: "Missing required fields for environment" };
    }

    const newEnv = new Env({
      envCode,
      envDescription,
    });

    const savedEnv = await newEnv.save();

    return {
      success: true,
      message: "Environment created successfully",
      env: savedEnv,
    };
  } catch (error) {
    console.error("Error creating environment:", error);
    if (error.code === 11000) {
      return { err: true, msg: "Environment code already exists" };
    } else {
      return { err: true, msg: error.message };
    }
  }
};
