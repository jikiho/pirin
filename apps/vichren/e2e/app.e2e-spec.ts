import { AppPage } from './app.po';

describe('vichren App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.text()).toContain('app works!');
  });
});
