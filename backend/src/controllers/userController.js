import { userService } from '../services';

export const userController = {
  async patch(req, res, next) {
    try {
      const data = await userService.patch({
        userId: req.header('userId'),
        isAdmin: req.header('isAdmin'),
        isVerified: req.header('isVerified'),
        newName: req.body.name,
        newEmail: req.body.email,
        newPassword: req.body.newPassword,
        currentPassword: req.body.currentPassword,
      });
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
