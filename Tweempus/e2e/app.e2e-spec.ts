import { TweempusPage } from './app.po';

describe('tweempus App', () => {
  let page: TweempusPage;

  beforeEach(() => {
    page = new TweempusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
