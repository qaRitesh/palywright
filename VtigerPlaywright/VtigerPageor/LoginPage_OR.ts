import { Page, Locator } from "@playwright/test";

export class LoginOR {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly themeDropdown: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.usernameInput = page.locator("//input[@name='user_name']");
    this.passwordInput = page.locator("//input[@name='user_password']");
    this.themeDropdown = page.locator("//select[@name='login_theme']");
    this.loginButton = page.locator("//input[@name='Login']");
  }
}
