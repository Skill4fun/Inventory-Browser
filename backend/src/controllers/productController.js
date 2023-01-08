import { productService } from '../services';

export const productController = {
  async get(req, res, next) {
    try {
      const data = await productService.getProduct(req);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },

  async patch(req, res, next) {
    try {
      const data = await productService.findOneAndUpdate();

      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },

  async post(req, res, next) {
    try {
      const data = await productService.addNewProduct();

      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
