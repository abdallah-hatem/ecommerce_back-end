const jwt = require("jsonwebtoken");

export default function checkNotAuth(req: any, res: any, next: any) {
  // const token = req.cookies.jwt;
  // if (token === undefined) {
  //   return next();
  // }
  // return res.status(401).json({ message: "Already logged in" });
}
