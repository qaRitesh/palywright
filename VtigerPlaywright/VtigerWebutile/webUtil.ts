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
    await this.page.waitForTimeout(2000)
    await locator.fill(text);
  }

   // Select dropdown by Label
  async selectDropdownByLabel(locator: Locator, label: string) {
    await this.page.waitForTimeout(2000)
    await locator.selectOption({ label });
  }

  // Select dropdown by Value
  async selectDropdownByValue(locator: Locator, value: string) {
    await this.page.waitForTimeout(2000)
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

<<<<<<< Updated upstream
  // Scroll to element
  async scrollToElement(selector: string){
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}
=======
  /////////////////////////////////// File /////////////////
  
    async fileUpload(element:Locator,filePath:string | string[]){
      await element.setInputFiles(filePath)
    }
  
    async isMultipleFiles(element: Locator): Promise<boolean> {
      await element.waitFor();
      const multipleAttr = await element.getAttribute('multiple');
      return multipleAttr !== null;
    }
  
    async fileremove(element:Locator){
      await element.setInputFiles([])
    }
    ///////////////////////////////////////// Action ///////////////////////////////////////
  //mouse over:
    async mouseover(element:Locator){
      await element.hover()
    }
    //Right Click:
    async rightClick(element:Locator){
      await element.waitFor();
      await element.click({button:'right'})
    }
    //DoubleClick:
    async doubleClick(element:Locator){
      await element.waitFor();
      await element.dblclick()
    }
  
    //Drag_Drop:
    async drogDrop(element:Locator,elementDrop:Locator){
      await element.dragTo(elementDrop)
    }
  
    //////////////////////////////// Scroll //////////////////////////////////////// :
    async scrollToElement(element: Locator) {
      await element.waitFor();
      await element.scrollIntoViewIfNeeded();
    }
    //Scroll by custom X or Y offset
    async scrollByOffset(x: number, y: number) {
      await this.page.evaluate(([scrollX, scrollY]) => window.scrollBy(scrollX, scrollY),
      [x, y])  
      
    }
    //Scroll to bottom of the page
    async scrollToBottom() {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
    //Scroll to top of the page
    async scrollToTop() {
      await this.page.evaluate(() => window.scrollTo(0, 0));
    }
  
  //////////////////////////////// Alert-pop //////////////////////////////
  
  
    //   Accept alert
    async acceptAlert() {
      this.page.on('dialog', async (dialog: Dialog) => {
        // console.log(`Alert message: ${dialog.message()}`);
        console.log(dialog.message());
  
        await dialog.accept();
      });
    }
  
    //  Dismiss alert
    async dismissAlert() {
      this.page.once('dialog', async (dialog: Dialog) => {
        console.log(`Alert message: ${dialog.message()}`);
        await dialog.dismiss();
      });
    }
  
    //  Accept prompt with text input
    async acceptPromptWithText(inputText: string) {
      this.page.once('dialog', async (dialog: Dialog) => {
        console.log(`Prompt message: ${dialog.message()}`);
        await dialog.accept(inputText);
      });
    }
  
    //  Get alert message and accept
    async getAlertTextAndAccept(): Promise<string> {
      let message = '';
      this.page.once('dialog', async (dialog: Dialog) => {
        message = dialog.message();
        await dialog.accept();
      });
      return message;
    }
  
  /////////////////////////// iframe /////////////////////////
  
  // Get frame by index
  async getFrameByIndex(index: number) {
    const frames = this.page.frames();
    return frames[index];
  }
  
  // Get frame by element handle
  async getFrameByElement(locator: string) {
    const frameElement = await this.page.$(locator);
    return await frameElement?.contentFrame();
  }
  
  // Get frame by name handle
  async getFramebyName(frameName:string){
   return await this.page.frame({name:frameName})
  }
  
  //  Get parent frame of a frame
   async getParentFrame(frame: Frame) {
    return frame.parentFrame();
  }
  
  }
  
>>>>>>> Stashed changes
