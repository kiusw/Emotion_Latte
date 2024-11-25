const User = require("../Models/User"); 
const userController = {};

userController.saveUser = async (userName, userId, userPassword) => {
  try {
    const user = await User.findOneAndUpdate(
      { mariadb_id: userId },
      {
        $set: {
          name: userName,
          password: userPassword,
          online: true
        }
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

userController.checkUser = async (socketId) => {
  try {
    const user = await User.findOne({ socketId: socketId });
    if (!user) {
      console.log("User not found with socketId:", socketId);
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error checking user:", error);
    return null;
  }
};

userController.findByUserId = async (userId) => {
  try {
    const user = await User.findOne({ mariadb_id: userId });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

module.exports = userController;
