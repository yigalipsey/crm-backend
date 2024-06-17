import { loginUserController } from "../../controllers/users/loginUserController.js";

export const LoginService = async (req, res) => {
  const response = await loginUserController(req.body);
  return res.json(response);
  if (!response?.err) {
    return res.status(200).json({ msg: "User Is Active NOW" });
  } else return res.status(401).json(response);
};
