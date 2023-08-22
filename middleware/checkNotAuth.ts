const jwt = require("jsonwebtoken");

export default function checkNotAuth(req: any, res: any, next: any) {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }
  res.redirect("/");
}
