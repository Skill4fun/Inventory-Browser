import { quoteRequestService } from '../services';

export const quoteRequestsController = {
  async get(req, res, next) {
    try {
      const userId = req.header('userId');
      const quoteRequests = await quoteRequestService.getQuoteRequests(userId);
      return res.status(200).json({ quoteRequests });
    } catch (error) {
      return next(error);
    }
  },
};
