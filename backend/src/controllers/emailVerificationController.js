import { emailVerificationService } from '../services';

export const emailVerificationController = {
  async get(req, res, next) {
    try {
      const data = await emailVerificationService.sendVerificationEmail(
        req.params.userId,
      );
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
  async patch(req, res, next) {
    try {
      const data = await emailVerificationService.verifyUser(
        req.params.userId,
        req.body.isLoggedIn,
      );
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
