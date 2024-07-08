import { hashUserPassword } from "../../helpers/bcrypt.js";
import { getIsraelDateTime } from "../../helpers/getdate.js";
import User from "../../models/UserModel.js";

export const addUser = async (data) => {
  console.log("kara");
  if (!data?.password || !data?.username)
    return {
      code: 106,
      err: true,
      msg: "The parameters password&userName must be entered",
    };
  const hashPassword = hashUserPassword(data.password);

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({
      username: data.username,
    });

    if (existingUser) {
      if (existingUser.active) {
        // User exists and is active
        return {
          code: 101,
          err: true,
          msg: "User with this email already exists and is active.",
        };
      } else {
        // User exists but is not active, check the time difference
        const currentTime = new Date(getIsraelDateTime());
        const userUpdateTime = new Date(existingUser.uDate);

        const timeDifference = Math.floor(
          (currentTime - userUpdateTime) / (60 * 1000)
        );
        if (timeDifference > 5) {
          // Delete the existing user
          await User.findByIdAndDelete(existingUser._id);

          // Create a new user
          const newUser = new User({
            username: data.username,
            password: hashPassword,
            email: data.email,
          });

          // Save the new user to the database
          const res = await newUser.save();
          return res?._id.toString();
        } else {
          // User exists but is not active, and the link is expired
          return {
            err: true,
            msg: "User link expired. Please wait 5 min and after register again.",
          };
        }
      }
    }

    // Create a new user
    const newUser = new User({
      username: data.username,
      password: hashPassword,
      email: data.email,
    });

    // Save the new user to the database
    const res = await newUser.save();
    return res?._id.toString();
  } catch (error) {
    return { err: true, msg: error };
  }
};
