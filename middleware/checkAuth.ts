const jwt = require("jsonwebtoken");

export default function checkAuth(req: any, res: any, next: any) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, callBack);
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }

  function callBack(err: any, decodedToken: any) {
    if (err) {
      res.status(401).json({ err });
    }
    next();
  }
}
