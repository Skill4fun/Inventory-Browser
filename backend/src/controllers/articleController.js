import { articleService } from '../services';

export const articleController = {
  async get(req, res, next) {
    try {
      const articles = await articleService.getArticle();
      return res.status(200).json({ articles });
    } catch (error) {
      return next(error);
    }
  },
  async post(req, res, next) {
    try {
      const data = await articleService.addArticle({
        brand: req.body.brand,
        minQty: req.body.minQty,
      });
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
