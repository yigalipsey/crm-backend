import Env from "../../models/EnvModel.js";
import User from "../../models/UserModel.js";

export const deleteEnvController = async (envId) => {
  try {
    // Find the environment and its associated users
    const env = await Env.findById(envId);
    const associatedUsers = await User.find({ envId });

    if (!env) {
      return { err: true, msg: "Environment not found" };
    }

    // Optionally, check if there are associated users
    // if (associatedUsers.length > 0) {
    //   // Decide how to handle associated users (e.g., error, reassign to another env)
    //   return {
    //     err: true,
    //     msg: "Cannot delete environment with associated users",
    //   };
    // }

    // Delete the environment
    await env.deleteOne();

    // Return a success message
    return { success: true, msg: "Environment deleted successfully" };
  } catch (error) {
    console.error("Error deleting environment:", error);
    throw error; // Re-throw the error to be handled by the service
  }
};
