const User = require("../models/User");

const findOrMakeUser = async email => {
  const user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({ email });
    const result = await newUser.save();
    return user;
  }

  return user;
};

module.exports = findOrMakeUser;
