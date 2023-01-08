import Product from '../models/Product';
import ApiError from '../error/ApiError';
import { complyProductSchemaProps } from '../data/complyProductSchemaProps';

export const productService = {
  async getProduct(req) {
    try {
      console.log(req.query);
      const {
        page = 1, limit = 10, minQty = 0, search,
      } = req.query;
      const { brand } = req.params;
      const regex = new RegExp(search, 'i');
      const filter = { $and: [{ qtyAvailable: { $gte: minQty } }] };
      /* eslint-disable-next-line dot-notation */
      if (brand) { filter['$and'].push({ brand }); }
      /* eslint-disable-next-line dot-notation */
      if (search) { filter['$and'].push({ $or: [{ factoryProductId: regex }, { nameEn: regex }] }); }

      const products = await Product.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const filteredProductCount = await Product.countDocuments(filter);

      const productsObject = {
        products,
        filteredProductCount,
        totalPages: Math.ceil(filteredProductCount / limit),
        currentPage: page,
      };
      return productsObject;
    } catch (error) {
      throw new ApiError(400, `productService/getProduct: ${error.message}`);
    }
  },

  async addNewProduct(reqProduct) {
    try {
      const newProduct = new Product(complyProductSchemaProps(reqProduct));
      const result = await newProduct.save();
      return result.factoryProductId;
    } catch (error) {
      throw new ApiError(400, `productService/addNewProduct: ${error.message}`);
    }
  },

  async updateProduct(reqProduct) {
    try {
      const schemaProperties = complyProductSchemaProps(reqProduct);
      const requestKeys = Object.keys(schemaProperties);
      const requestValues = Object.values(schemaProperties);
      const changedFields = [];
      const filter = {};
      let result;

      if (reqProduct.TwrEan !== '') {
        filter.eanCode = reqProduct.TwrEan;
      } else {
        filter.factoryProductId = reqProduct.TwrCode;
      }

      const foundProduct = await Product.findOne(filter);

      if (!foundProduct) {
        throw new ApiError(400, `Product ${Object.values(filter)[0]} not found!`);
      }

      for (let i = 0; i < requestKeys.length; i += 1) {
        if (foundProduct[requestKeys[i]] !== schemaProperties[requestKeys[i]] && requestKeys[i] !== 'lastUpdated') {
          foundProduct[requestKeys[i]] = requestValues[i];
          changedFields.push(requestKeys[i]);
        }
      }

      if (changedFields.length > 0) {
        result = await foundProduct.save();
        return result.factoryProductId;
      }
      return result;
    } catch (error) {
      throw new ApiError(400, `productService/updateProduct: ${error.message}`);
    }
  },
};
