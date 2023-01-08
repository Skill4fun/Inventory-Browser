import { loginService } from '../services/loginService';

export const loginController = {
  async post(req, res, next) {
    try {
      const data = await loginService.authentication({
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(data.status).json({ token: data.token });
    } catch (error) {
      return next(error);
    }
  },
};
