import { listItemService } from '../services';

export const listItemsController = {
  async get(req, res, next) {
    try {
      const { userId } = req.params;
      const listItems = await listItemService.getListItems(userId);
      return res.status(200).json({ listItems });
    } catch (error) {
      return next(error);
    }
  },
  async post(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.params.userId || req.header('userId');
      const listItems = await listItemService.addListItems(productId, userId);
      return res.status(200).json({ listItems });
    } catch (error) {
      return next(error);
    }
  },
  async delete(req, res, next) {
    const { listItemId } = req.params;
    try {
      const confirmation = await listItemService.deleteListItem(listItemId);
      return res.status(200).json(confirmation);
    } catch (error) {
      return next(error);
    }
  },
  async deleteAllPending(req, res, next) {
    const userId = req.header('userId');
    try {
      const confirmation = await listItemService.deleteAllPendingListItem(userId);
      return res.status(200).json(confirmation);
    } catch (error) {
      return next(error);
    }
  },
  async patch(req, res, next) {
    try {
      const userId = req.params.userId || req.header('userId');
      const data = await listItemService.saveList(userId);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
