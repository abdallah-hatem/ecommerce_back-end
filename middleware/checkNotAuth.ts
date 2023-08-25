const jwt = require("jsonwebtoken");

export default function checkNotAuth(req: any, res: any, next: any) {
  const token = req.session.jwt;
  if (!token) {
    return next();
  }
  return res.status(401).json({ message: "Already logged in" });
}
