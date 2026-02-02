const { User } = require("../models/index");
const { NotFoundError, ConflictError } = require("../errors/index");

const userService = {

  // Get user profile details by ID
  async getProfileDetail(userId, log) {
    log?.info(
      { userId },
      "Fetching user profile"
    );

    const user = await User.findByPk(userId);

    if (!user) {
      log?.warn(
        { userId },
        "User not found while fetching profile"
      );
      throw new NotFoundError(`User not found with id ${userId}`);
    }

    log?.info(
      { userId, role: user.role },
      "User profile fetched successfully"
    );

    return user;
  },
};

module.exports = { userService };
