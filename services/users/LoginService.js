import { loginUserController } from "../../controllers/users/loginUserController.js";
import Env from "../../models/EnvModel.js";

export const LoginService = async (req, res) => {
  try {
    const { username, password, envCode } = req.body;

    // Find the environment by envCode
    const env = await Env.findOne({ envCode });
    if (!env) {
      return res
        .status(400)
        .json({ err: true, msg: "Invalid environment code" });
    }

    const loginData = {
      username,
      password,
      envId: env._id,
    };

    const response = await loginUserController(loginData);

    if (!response.err) {
      return res
        .status(200)
        .json({ msg: "User Is Active NOW", data: response });
    } else {
      return res.status(401).json(response);
    }
  } catch (error) {
    return res.status(500).json({ err: true, msg: error.message });
  }
};
