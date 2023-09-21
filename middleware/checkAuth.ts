const jwt = require("jsonwebtoken");

export default function checkAuth(req: any, res: any, next: any) {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      if (decodedToken) return next();
    }

    return res
      .status(401)
      .json({ message: "Not authorized, Must be logged in" });
  } catch (error) {
    console.log(error);
  }
}
