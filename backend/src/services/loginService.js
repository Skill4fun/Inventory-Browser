import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { errorMessages } from '../models/errorMessages';
import { loginValidation } from '../validation/loginValidation';
import ApiError from '../error/ApiError';
import User from '../models/User';
import config from '../config';

export const loginService = {
  async authentication({ email, password }) {
    if (!email && !password) {
      throw new ApiError(400, errorMessages.emptyFields);
    }

    const { error } = loginValidation({ email, password });
    if (error) throw new ApiError(400, error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, errorMessages.wrongData);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new ApiError(400, errorMessages.wrongData);
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },

      config.tokenSecret,
    );
    return { token, status: 200 };
  },
};
