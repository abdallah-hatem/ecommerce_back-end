import { getUserById } from "../lib/user/getUserById";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export default async function checkAdmin(req: any, res: any, next: any) {
  // const token = req.cookies.jwt;

  // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  // if (decodedToken) {
  //   const userId = decodedToken.id;
  //   const user = await getUserById(userId);

  //   const adminPass = "admin";
  //   const adminEmail = "admin@gmail.com";

  //   const validPass = await bcrypt.compare(adminPass, user.password);

  //   if (user.email === adminEmail && validPass) {
  //     return next();
  //   }
  //   return res.status(401).json({ message: "Not authorized, must be Admin" });
  // }
  return next();
}
