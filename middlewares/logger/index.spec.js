const { createRequest, createResponse } = require("node-mocks-http");
const loggerMiddleware = require('./index')

describe('loggerMiddleware middleware', () => {
  const logger = { log: jest.fn() };
  const middleware = loggerMiddleware(logger);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next', async () => {
    const request = createRequest({
      method: 'GET'
    });
    const response = createResponse();
    const next = jest.fn();

    await middleware(request, response, next);
    response.status(200);
    response.send('test');

    expect(next).toHaveBeenCalled();
  });

  it('should call logger.log', async () => {
    const request = createRequest({
      method: 'GET'
    });
    const response = createResponse({
      eventEmitter: require('events').EventEmitter
    });
    const next = jest.fn();

    await middleware(request, response, next);
    response.status(200);
    response.end('test');

    expect(logger.log).toHaveBeenCalled();
    expect(logger.log.mock.calls).toMatchSnapshot();
  });
})
