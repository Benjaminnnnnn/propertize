import User from "../mongodb/models/user.js";

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const userExists = await User.findOne({ email });

    // user already exists
    if (userExists) {
      return res.status(200).json(userExists);
    }

    // create a new user
    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req, res) => {};

export { getAllUsers, createUser, getUserInfoByID };
