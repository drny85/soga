import { RoutermoduleModule } from './routermodule.module';

describe('RoutermoduleModule', () => {
  let routermoduleModule: RoutermoduleModule;

  beforeEach(() => {
    routermoduleModule = new RoutermoduleModule();
  });

  it('should create an instance', () => {
    expect(routermoduleModule).toBeTruthy();
  });
});
