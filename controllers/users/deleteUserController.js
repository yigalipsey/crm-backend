import User from "../../models/UserModel.js";

export const deleteUserController = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return { err: true, msg: "User not found" };
    }

    return { success: true, msg: "User deleted successfully", deletedUser };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw the error to be handled by the service
  }
};
