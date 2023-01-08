import checkPermission from './checkPermission';

describe('checkPermission middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn();
  const expectedError = new Error('Invalid userId');

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  test('without headers', async () => {
    checkPermission(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('without "authorization" header', async () => {
    mockRequest = {
      headers: {},
    };
    checkPermission(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('with isAdmin: true in header', async () => {
    mockRequest = {
      header: jest.fn('isAdmin').mockReturnValue(true),
    };
    checkPermission(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith();
  });
  test('with userId in token and userId in params to equal', async () => {
    mockRequest = {
      header: jest.fn('userId').mockReturnValue('628cb71c04f2e6575298b02e'),
      params: {
        userId: '628cb71c04f2e6575298b02e',
      },
    };
    checkPermission(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith();
  });
});
