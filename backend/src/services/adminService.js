import { Admin } from '../models/Admin';

export const adminService = {
  async getAdmin() {
    return Admin;
  },
};
