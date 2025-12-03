import { Page } from '@playwright/test';
import { WebUtil } from './Webutil';
import { CommonLocators } from '../VtigerPageor/CommonLocators';

export class Common extends CommonLocators {

  private util: WebUtil;
  constructor(page: Page) {
    super(page)
    this.util = new WebUtil(page);
  }

  async marketingModule(moduleName: string) {
    await this.util.mouseover(this.marketingMadule);
   await this.util.clickElement(this.gotoMarketingSubmodule(moduleName))

  }

}
