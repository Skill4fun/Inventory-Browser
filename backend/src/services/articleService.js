import Product from '../models/Product';
import Article from '../models/Article';
import ApiError from '../error/ApiError';
import { errorMessages } from '../models/errorMessages';

export const articleService = {
  async getArticle() {
    try {
      const articles = await Article.find({}).populate('productId');
      const articlesToResponseFormat = articles.map((article) => ({
        id: article._id,
        isActive: article.isActive,
        publish_date: article.publish_date,
        expirationDate: article.expirationDate,
        special_price: article.special_price,
        priceExpEur: article.productId.priceExpEur,
        factoryProductId: article.productId.factoryProductId,
        eanCode: article.productId.eanCode,
        nameEn: article.productId.nameEn,
        brand: article.productId.brand,
        photoUrl: article.productId.photoUrl,
        descEn: article.productId.descEn,
        qtyAllStock: article.productId.qtyAllStock,
      }));
      return articlesToResponseFormat;
    } catch (error) {
      throw new ApiError(500, errorMessages.databaseArticle);
    }
  },

  async addArticle(brand = 'VARR', minQty = 100) {
    if (!brand) {
      throw new ApiError(401, 'Brand name is required.');
    }
    if (!minQty) {
      throw new ApiError(401, 'Min quantity is required.');
    }
    const promoProducts = await Product.find({ brand, minQty });
    if (!promoProducts.length) {
      throw new ApiError(401, 'Can\'t find products');
    }
    const articles = promoProducts.map((product) => new Article({
      isActive: true,
      publish_date: new Date(),
      special_price: (product.priceExpEur * 0.90),
      expirationDate: '2022-09-29',
      productId: product._id,
    }));

    await Article.insertMany(articles);
    return { articles };
  },
};
