import jwt from "jsonwebtoken";

export function generateToken(userId, response) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  response.cookie("jwt", token, {
    httpOnly: true, // prevent XSS
    sameSite: "strict", // prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
}
