const articleProviderMiddleware = require('./index');
const { createRequest, createResponse } = require("node-mocks-http");

const provider = jest.fn(() => Promise.resolve('Lorem ipsum'));

describe('articleProvider middleware', () => {
  const middleware = articleProviderMiddleware(provider);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with article', async () => {
    const request = createRequest();
    const response = createResponse();
    const next = jest.fn();

    await middleware(request, response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(request).toMatchSnapshot('request');
    expect(response).toMatchSnapshot('response');
  });

  it('should call next on error', async () => {
    const request = createRequest();
    const response = createResponse();
    const next = jest.fn();
    provider.mockRejectedValueOnce(new Error('example'))

    await middleware(request, response, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls).toMatchSnapshot();
  });
})
