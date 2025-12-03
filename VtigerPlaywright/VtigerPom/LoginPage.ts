import { Page } from '@playwright/test';
import { WebUtil } from './Webutil';
import { LoginPageLocators } from '../VtigerPageor/LoginPageLocators';

export class LoginPage extends LoginPageLocators {

  private util: WebUtil;
  constructor(page: Page) {
    super(page)
    this.util = new WebUtil(page);
  }

  async validLogin(username: string, password: string, themeLabel: string) {
    await this.util.typeText(this.username, username);
    await this.util.typeText(this.password, password);

    const selecttype=await this.util.isMultiSelect(this.colorTheme)
    console.log(selecttype)
    
    const autooptionselect=await this.util.getFirstSelectedOptionText(this.colorTheme)
    console.log(autooptionselect)

    await this.util.selectDropdownByLabel(this.colorTheme, themeLabel);
    const alloptions=await this.util.getAllOptionsText(this.colorTheme)
    console.log(alloptions)

    await this.util.clickElement(this.loginBtn);
  }
}
