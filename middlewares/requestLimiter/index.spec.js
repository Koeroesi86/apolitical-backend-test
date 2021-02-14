const rateLimiterMiddleware = require('./index');
const { createRequest, createResponse } = require("node-mocks-http");

const provider = {
  get: jest.fn(() => Promise.resolve(0)),
  set: jest.fn(() => Promise.resolve()),
};

describe('articleProvider middleware', () => {
  const middleware = rateLimiterMiddleware(provider);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next by default', async () => {
    const request = createRequest({
      ip: '127.0.0.1',
    });
    const response = createResponse();
    const next = jest.fn();

    await middleware(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(provider.set.mock.calls).toMatchSnapshot('provider.set');
    expect(response._getHeaders()).toMatchSnapshot('response headers');
  });

  it('should not allow 4th request', async () => {
    provider.get.mockResolvedValueOnce(3);
    const request = createRequest({
      ip: '127.0.0.1',
    });
    const response = createResponse();
    const next = jest.fn();

    await middleware(request, response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(provider.set.mock.calls).toMatchSnapshot('provider.set');
    expect(response._getHeaders()).toMatchSnapshot('response headers');
  });
})
