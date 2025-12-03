
import { Page, Locator } from '@playwright/test';

export class LoginPageLocators {
  protected page: Page;

  // Locator variables
  public username: Locator;
  public password: Locator;
  public colorTheme: Locator;
  public loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.username = page.locator("//input[@name='user_name']");
    this.password = page.locator("//input[@name='user_password']");
    this.colorTheme = page.locator("//select[@name='login_theme']"); 
    this.loginBtn = page.locator("//input[@title='Login [Alt+L]']");
  }
}
