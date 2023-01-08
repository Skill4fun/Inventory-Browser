import QuoteRequest from '../models/QuoteRequest';

export const quoteRequestService = {
  async getQuoteRequests(userId) {
    const quoteRequests = await QuoteRequest.find({ user: userId }).populate(
      'productId',
    );

    const quoteRequestsToResponseFormat = quoteRequests.map((quoteRequest) => ({
      id: quoteRequest._id,
      status: quoteRequest.status,
      saveDate: quoteRequest.saveDate,
      expirationDate: quoteRequest.expirationDate,
      product: quoteRequest.productId,
    }));

    return quoteRequestsToResponseFormat;
  },
};
