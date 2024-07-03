import chalk from "chalk";
import { createUserController } from "../../controllers/users/createUserController.js";

export const CreateUserService = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role === "user") {
      return res
        .status(403)
        .json({ err: true, msg: "Unauthorized: Only admins can create users" });
    }

    // Extract user data from the request body
    const { username, password } = req.body;

    console.log(chalk.red(JSON.stringify(req.user, null, 2)));

    const envId = req.user.envId;

    // Call the controller to create the user
    const result = await createUserController({ username, password, envId });

    // Handle the controller's response
    if (result.err) {
      return res.status(400).json(result); // Send error response
    } else {
      return res.status(201).json(result); // Send success response
    }
  } catch (error) {
    console.error("Error in createUserService:", error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
