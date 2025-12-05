import { Page, Locator } from "@playwright/test";

export class WebUtil {
  constructor(private page: Page) {}

  // Navigate to URL
  async goToUrl(url: string) {
    await this.page.goto(url);
  }

   // Click element
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor();
    await locator.click();
  }

  // Type text in input box
  async fillText(locator: Locator, text: string) {
    await locator.waitFor();
    await locator.fill(text);
  }

   // Select dropdown by Label
  async selectDropdownByLabel(locator: Locator, label: string) {
    await locator.waitFor();
    await locator.selectOption({ label });
  }

  // Select dropdown by Value
  async selectDropdownByValue(locator: Locator, value: string) {
    await locator.waitFor();
    await locator.selectOption({ value });
  }

  // Select dropdown by Index
 async selectByIndex(locator: string, index: number) {
  const element = this.page.locator(locator);
  const options = await element.locator('option').count();
  
  if (index >= options) {
    throw new Error(`Index ${index} is out of range. Dropdown options: ${options}`);
  }

  const optionValue = await element.locator('option').nth(index).getAttribute('value');
  await element.selectOption(optionValue);
}


  // Fetch all dropdown options
  async getAllDropdownOptions(selector: string) {
    const options = await this.page.$$(selector + " option");
    const values: string[] = [];

    for (const option of options) {
      const text = await option.textContent();
      if (text) values.push(text.trim());
    }
    return values;
  }

  // Get currently selected dropdown option text
  async getSelectedOption(selector: string){
    const selected = await this.page.$(selector + " option:checked");
    if (selected) {
      const text = await selected.textContent();
      return text ? text.trim() : null;
    }
    return null;
  }

  // Get element text
  async getText(selector: string){
    await this.page.waitForSelector(selector);
    const text = await this.page.textContent(selector);
    return text ? text.trim() : null;
  }

  // Check element visibility
  async isVisible(selector: string){
    return await this.page.isVisible(selector);
  }

  // Scroll to element
  async scrollToElement(selector: string){
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}
