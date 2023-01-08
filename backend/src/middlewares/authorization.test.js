import authorization from './authorization';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockReturnValue({ userId: 'abc' }),
}));

describe('Authorization middleware', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn();
  const expectedError = new Error('Invalid token');

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  test('without headers', async () => {
    authorization(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('without "authorization" header', async () => {
    mockRequest = {
      headers: {},
    };
    authorization(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedError);
  });

  test('with proper "authorization" header', async () => {
    mockRequest = {
      header: jest.fn().mockReturnValue('Bearer abc'),
      headers: {
        Authorization: 'Bearer abc',
      },
    };

    authorization(mockRequest, mockResponse, nextFunction);

    expect(mockRequest.headers.userid).toBe('abc');
  });
});
