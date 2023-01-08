import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import config from '../config';
import ApiError from '../error/ApiError';
import { errorMessages } from '../models/errorMessages';
import User from '../models/User';

const generateWelcomeMail = (name, userId) => `
  <h1>Kedves ${name},</h1>
  <h2>Köszönjük, hogy csatlakozott készletböngészőnkhoz az Inventory Browser -hez!</h2>
  <p>Szeretnénk megerősíteni, hogy fiókja sikeresen létrejött.</p>
  <p>Kérjük erősítse meg az email címét<strong><a href="http://localhost:3000/email-verification/${userId}">itt!</a></strong></p>

  Üdvözlettel,</br>
  <b>A Browser-Team</b>`;

export const emailVerificationService = {
  async sendVerificationEmail(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, errorMessages.noUserId);
    }

    if (user.isVerified) {
      throw new ApiError(400, 'User already verified');
    }

    const transport = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });

    await transport.sendMail({
      from: config.mailFrom,
      to: user.email,
      subject: 'Inventory Browser - Emailcím megerősítés',
      html: generateWelcomeMail(user.name, userId),
    });

    return { confirmation: 'Verification email sent' };
  },

  async verifyUser(userId, isLoggedIn) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, errorMessages.noUserId);
    }

    if (user.isVerified) {
      throw new ApiError(400, 'User already verified');
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { isVerified: true } },
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
      return { confirmation: 'Email address is verified', ...(isLoggedIn && { token }) };
    } catch (error) {
      throw new ApiError(400, 'Error while verifying user');
    }
  },

};
