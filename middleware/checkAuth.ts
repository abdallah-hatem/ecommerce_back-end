const jwt = require("jsonwebtoken");

export default function checkAuth(req: any, res: any, next: any) {
  const token = req.cookies.jwt;
  console.log(token)

  function cb(err: any, decodedToken: any) {
    if (err) {
      res.status(401).json({ message: "Not authorized" });
      return res.redirect("/");
    }
    next();
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, cb);
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
}
