const User = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // find one user
    findUser: async () => {
      return User.findOne({ username }).populate("savedBooks");
    }
  },
  Mutation: {
    // create user
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login user
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Password is incorrect!");
      }

      const token = signToken(user);

      return { token, user };
    },
    // save book
    saveBook: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: _id },
          {
            $addToSet: { savedBooks: args }
          },
          {
            new: true,
            runValidators: true
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    // delete book
    deleteBook: async (parent, { bookId }, context) => {
      if(context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        )
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
module.exports = resolvers;
