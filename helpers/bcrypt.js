import bcrypt from "bcrypt";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const hashUserPassword = (password) => {
  return hashPassword(password);
};

export const compareUserPassword = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};
