const moxios = require("moxios");
const articleStorage = require("./index");

describe('articleStorage', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch articles', async () => {
    moxios.stubRequest('http://asdfast.beobit.net/api/', {
      status: 200,
      response: {
        text: 'Lorem ipsum'
      }
    });

    const res = await articleStorage();

    expect(moxios.requests.mostRecent()).toMatchSnapshot('request');
    expect(res).toMatchSnapshot('result');
  })
})