import chalk from "chalk";
import { createEnvController } from "../../controllers/env/createEnvController.js";
import { createUserController } from "../../controllers/users/createUserController.js";
import { deleteEnvController } from "../../controllers/env/deleteEnvController.js";

export const createEnvService = async (req, res) => {
  try {
    // Check if the user is a master admin (no associated envId)
    if (req.user.envId !== null) {
      return res.status(403).json({
        err: true,
        msg: "Unauthorized: Only master admins can create environments",
      });
    }

    const { envCode, envDescription } = req.body;

    // Basic input validation for environment
    if (!envCode || !envDescription) {
      return res
        .status(400)
        .json({ err: true, msg: "Missing required fields for environment" });
    }

    // Create the environment
    const newEnv = await createEnvController({ envCode, envDescription });

    if (newEnv.err) {
      return res.status(400).json(newEnv); // Return error if environment creation failed
    }

    console.log(
      chalk.green(
        "Environment created:",
        JSON.stringify(newEnv.env._id, null, 2)
      )
    );

    // Create the admin user
    const username = "admin";
    const password = "1111";
    const envId = newEnv.env._id;
    const role = "admin";
    const email = "test@gmail.com";

    const newUser = await createUserController({
      username,
      password,
      envId,
      role,
      email,
    });

    if (newUser.err) {
      const deletedEnv = await deleteEnvController(newEnv._id);
      // console.log(chalk.red(deletedEnv));
      return res.status(400).json(newUser);
    }

    return res.status(201).json({
      success: true,
      message: "Environment and admin user created successfully",
      env: newEnv.env,
      adminUser: newUser.user,
    });
  } catch (error) {
    console.error("Error in createEnvService:", error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
