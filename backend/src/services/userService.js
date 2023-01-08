import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError';
import { errorMessages } from '../models/errorMessages';
import User from '../models/User';
import { userUpdateValidation } from '../validation/userUpdateValidation';
import config from '../config';

export const userService = {
  async patch({
    userId,
    newName,
    newEmail,
    newPassword,
    currentPassword,
    isAdmin,
    isVerified,
  }) {
    if (!newName && !newEmail && !newPassword) {
      throw new ApiError(400, 'A field is required.');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, errorMessages.noUserId);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, errorMessages.wrongOldPassword);
    }

    const userDataToUpdate = {
      name: newName || user.name,
      email: newEmail || user.email,
      password: newPassword || currentPassword,
      isAdmin,
      isVerified,
    };

    const { error } = userUpdateValidation(userDataToUpdate);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    if (newEmail !== user.email) {
      const emailExist = await User.findOne({ email: newEmail });
      if (emailExist) throw new ApiError(400, 'Email is already taken');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDataToUpdate.password, saltRounds);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: userDataToUpdate.name,
          email: userDataToUpdate.email,
          password: hashedPassword,
          isAdmin,
          isVerified,
        },
      },
      { new: true },
    );

    const token = jwt.sign(
      {
        userId: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isVerified: updatedUser.isVerified,
      },
      config.tokenSecret,
    );

    return { token };
  },
};
