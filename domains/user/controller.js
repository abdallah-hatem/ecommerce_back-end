const { prisma } = require("../../lib/prisma.ts");

// Get Users
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.find({});

    if (!users) {
      return res.status(404).json({ message: "NO users found!" });
    }

    res.status(200).json({
      message: "here u go",
      users,
    });
  } catch (error) {
    res.send({ message: error });
  }
}

module.exports = {
  getAllUsers,
};
