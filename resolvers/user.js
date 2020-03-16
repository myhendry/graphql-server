const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  Mutation: {
    signup: async (_, { input }) => {
      try {
        //! See if email already registered
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error("Email already in use");
        }
        //! If no user found, hash password
        const hashedPassword = await bcrypt.hash(input.password, 12);
        //! Create new User in database
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        console.log(result);
        //! Create JWT
        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ email: result.email }, secret, {
          expiresIn: "1d"
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    signin: async (_, { input }) => {
      try {
        //! Check if user exists
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }
        //! Check if password is valid
        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect Password");
        }
        //! Create JWT
        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d"
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
