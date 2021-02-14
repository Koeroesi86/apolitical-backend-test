const rateStorage = require("./index");

describe('rateStorage', () => {
  beforeEach(() => {
    rateStorage._visitorCounter = {};
  });

  it('should get default value', async () => {
    expect(await rateStorage.get('127.0.0.1')).toMatchSnapshot();
  });

  it('should set value', async () => {
    await rateStorage.set('127.0.0.1', 100)
    expect(rateStorage._visitorCounter).toMatchSnapshot();
  });

  it('should retrieve set value', async () => {
    await rateStorage.set('127.0.0.1', 100)
    expect(await rateStorage.get('127.0.0.1')).toMatchSnapshot();
  });
})