import User from "../models/UserModel.js";
import { hashUserPassword } from "../helpers/bcrypt.js";

export const ensureMasterAdminExists = async () => {
  try {
    const existingMasterAdmin = await User.findOne({
      username: "amit",
      envId: null,
    });

    if (!existingMasterAdmin) {
      const password = "1111";
      const hashedPassword = hashUserPassword(password);
      const newMasterAdmin = new User({
        username: "amit",
        password: hashedPassword,
        role: "master",
        envId: null,
      });
      await newMasterAdmin.save();
    }
  } catch (error) {
    console.error("Error checking or creating master admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
