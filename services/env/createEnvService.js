// env.service.js
import { createEnvController } from "../../controllers/env/createEnvController.js";
import chalk from "chalk";
export const createEnvService = async (req, res) => {
  try {
    // Check if the user is an admin (you'll need authentication middleware for this)
    if (req.user.envId !== null) {
      return res.status(403).json({
        err: true,
        msg: "Unauthorized: Only master admins can create environments",
      });
    }

    //Prepare the data
    const { envCode, envDescription } = req.body;
    const adminUserId = req.user.userId;

    const result = await createEnvController(
      { envCode, envDescription },
      adminUserId
    );

    if (result.err) {
      return res.status(400).json(result);
    } else {
      return res.status(201).json(result);
    }
  } catch (error) {
    console.error("Error in createEnvService:", error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
