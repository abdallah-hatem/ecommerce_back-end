const jwt = require("jsonwebtoken");

export default function checkNotAuth(req: any, res: any, next: any) {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, callBack);
  }

  function callBack(err: any, decodedToken: any) {
    if (err) {
      // return res.status(401).json({ err });
      return res.status(401).json({ message: "Already logged in" });
    }
    next();
  }
  // return res.status(401).json({ message: "Already logged in" });
}
