const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
import User from "../lib/user/interfaces";
import { getUserById } from "../lib/user/getUserById";
import { isUserRegistered } from "../lib/user/isUserRegistered";

async function authUser(email: string, password: string, done: any) {
  try {
    const user = await isUserRegistered(email);
    if (!user) {
      return done(null, false, { message: "No user found!" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return done(null, false, { message: "Password is incorrect!" });
    }

    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(error);
  }
}

const strategy = new LocalStrategy({ usernameField: "email" }, authUser);

passport.use(strategy);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: any, done: any) => {
  try {
    const user = await getUserById(id);
    user && done(null, user);
  } catch (error) {
    done(error);
  }
});
