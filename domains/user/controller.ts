import User from "../../lib/user/interfaces";
const { isUserRegistered } = require("../../lib/user/isUserRegistered");
const bcrypt = require("bcrypt");
const { prisma } = require("../../config/prisma");
const jwt = require("jsonwebtoken");

// Get Users
async function getAllUsers(req: any, res: any) {
  try {
    const users = await prisma.user.findMany({});

    if (!users) {
      return res.status(404).json({ message: "NO users found!" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.send({ message: error });
  }
}

// Create a user
async function signUp(req: any, res: any) {
  try {
    const { name, email, password } = req.body;

    // find if email already exists
    const user = await isUserRegistered(email);
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    if (!newUser) {
      return res
        .status(401)
        .json({ message: "User not successful created database ERROR!" });
    }

    res.status(201).json({ message: "succefully added", data: newUser });
  } catch (error) {
    res.status(401).json({
      message: "User not successful created",
      error,
    });
    console.log(error);
  }
}

// Login
async function login(req: any, res: any) {
  const { email, password } = req.body;
  try {
    // find if email already exists
    const user = await isUserRegistered(email);
    if (!user) {
      return res.status(404).send("Error user not found. Please Signup");
    }

    // check if password is accurate
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // create token
    const { id, name } = await user;
    const maxAge = 3 * 60 * 60; // 3hrs

    const token = jwt.sign({ id, name }, process.env.TOKEN_SECRET, {
      expiresIn: maxAge,
    });

    // req.session.jwt = token;
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
      httpOnly: false,
      sameSite: "none",
      secure: true,
      credentials: true,
      origin: "https://frontend-for-testing-backend.vercel.app",
    });

    res.status(200).json({ message: "Login successful", userId: id });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Delete user
async function deleteUser(req: any, res: any) {
  const id = Number(req.params.id);

  // NOT DONE YET:  check if logged in

  try {
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: `no user found with id: ${id}` });
    }

    res.status(200).json({ message: "User deleted successful", user });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Get user by id
async function getUserById(req: any, res: any) {
  const id = req.params.id;

  // NOT DONE YET:  check if logged in

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: `no user found with id: ${id}` });
    }

    res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
    console.log(error);
  }
}

// Get cookie
async function getCookie(req: any, res: any) {
  try {
    const cookie = req.session.jwt;

    res.status(200).json({ message: "cookie sent successfully", cookie });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  signUp,
  login,
  deleteUser,
  getUserById,
  getCookie,
};
