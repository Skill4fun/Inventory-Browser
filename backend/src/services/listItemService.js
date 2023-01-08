import ApiError from '../error/ApiError';
import ListItem from '../models/ListItem';
import QuoteRequest from '../models/QuoteRequest';
import Product from '../models/Product';

export const listItemService = {

  async getListItems(userId) {
    const listItems = await ListItem.find({ userId, status: 'pending' }).populate('productId');
    const listItemsToResponseFormat = listItems.map((item) => ({
      id: item._id,
      status: item.status,
      listItemDate: item.listItemDate,
      factoryProductId: item.productId.factoryProductId,
      eanCode: item.productId.eanCode,
      nameEn: item.productId.nameEn,
      brand: item.productId.brand,
      priceExpEur: item.productId.priceExpEur,
      photoUrl: item.productId.photoUrl,
      descEn: item.productId.descEn,
      lastUpdated: item.productId.lastUpdated,
      qtyAllStock: item.productId.qtyAllStock,
      weightKgBr: item.productId.weightKgBr,
      weightKgNet: item.productId.weightKgNet,
    }));
    return listItemsToResponseFormat;
  },
  async addListItems(productId, userId) {
    if (!productId) {
      throw new ApiError(401, 'Product ID is required.');
    }
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new ApiError(401, "Product doesn't exists.");
    }

    const listItem = new ListItem({
      status: 'pending',
      listItemDate: new Date(),
      userId,
      productId: product._id,
    });
    await listItem.save();

    return {
      id: listItem._id,
      status: 'pending',
      listItemDate: listItem.listItemDate,
      productId: listItem.productId,
    };
  },
  async deleteListItem(listItemId) {
    try {
      await ListItem.deleteOne({ _id: listItemId });
      return { confirmation: 'List item deleted' };
    } catch (error) {
      throw new ApiError(400, 'Error while removing product');
    }
  },
  async deleteAllPendingListItem(userId) {
    try {
      const deleteResult = await ListItem.deleteMany({ userId, status: 'pending' });
      return { confirmation: `${deleteResult.deletedCount} list item(s) deleted` };
    } catch (error) {
      throw new ApiError(400, 'Error while removing products');
    }
  },
  async saveList(userId) {
    const pendingListItems = await ListItem.find({ userId, status: 'pending' }).populate('productId');

    if (!pendingListItems.length) throw new ApiError(400, 'Can\'t find pending list items');

    await ListItem.updateMany({ userId, status: 'pending' }, { status: 'saved' });

    const quoteRequests = pendingListItems.map((listItem) => new QuoteRequest({
      status: 'not active',
      saveDate: new Date(),
      expirationDate: null,
      user: listItem.userId,
      productId: listItem.productId.id,
      factoryProductId: listItem.productId.factoryProductId,
      productName: listItem.productId.nameEn,
      priceExpEur: listItem.productId.priceExpEur,
      eanCode: listItem.productId.eanCode,
      photoUrl: listItem.productId.photoUrl,
    }));
    await QuoteRequest.insertMany(quoteRequests);
    return { quoteRequests };
  },
};
