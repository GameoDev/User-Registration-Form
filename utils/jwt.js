import jwt from "jsonwebtoken";

const secretKey = "3486utiopq";

export const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
