
import { Page, Locator } from '@playwright/test';

export class CommonLocators {
  protected page: Page;

  // Locator variables
  public marketingMadule: Locator;


  constructor(page: Page) {
    this.page = page;

    this.marketingMadule=page.locator("//a[text()='Marketing']");
  }

   gotoMarketingSubmodule(moduleName:string){
   return this.page.locator("//div[@id='Marketing_sub']//a[text()='"+moduleName+"']");
  }


}


////div[@id='Marketing_sub']//a[text()='']