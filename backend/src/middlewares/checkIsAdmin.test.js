
import checkIsAdmin from './checkIsAdmin';
import ApiError from '../error/ApiError';

describe('checkIsAdmin middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn();
  const expectedError = new ApiError(401, 'Unauthorized access');
  const expectedError2 = new Error('Unauthorized access');

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  test('without headers', async () => {
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError2);
  });


  test('with isAdmin: false in header', async () => {
    mockRequest = {
      header: jest.fn('isAdmin').mockReturnValue(false),
    };
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('with isAdmin: true in header', async () => {
    mockRequest = {
      header: jest.fn('isAdmin').mockReturnValue(true),
    };
    checkIsAdmin(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith();
  });
});

