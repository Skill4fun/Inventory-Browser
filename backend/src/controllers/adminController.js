import { adminService } from '../services';

export const adminController = {
  async get(req, res, next) {
    try {
      const data = await adminService.getAdmin();
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
