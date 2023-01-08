import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError';
import User from '../models/User';
import { registerValidation } from '../validation/registerValidation';
import { emailVerificationService } from './emailVerificationService';

export const registerService = {
  async register({ name, email, password }) {
    const { error } = registerValidation({ name, email, password });

    if (error) {
      if (!name && !email && !password) {
        throw new ApiError(400, 'Name, email and password are required.');
      }
      throw new ApiError(400, error.details[0].message);
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new ApiError(400, 'Email is already taken');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      isVerified: false,
    });

    await user.save();

    await emailVerificationService.sendVerificationEmail(user._id);

    return {
      id: user._id,
      email,
      isAdmin: false,
      isVerified: false,
    };
  },
};
