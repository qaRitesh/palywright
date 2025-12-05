import { Page, Locator,Frame ,Dialog} from "@playwright/test";

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
    await locator.pressSequentially(text,{delay:200});
  }

  ///////////////////////////////////////////Drop-Drown/////////////////////////
  //Select_Drop-Down:
  async selectDropdownByLabel(element: Locator, visibleText: string) {
 await this.page.waitForTimeout(2000)
     await element.selectOption({ label:visibleText });
  }

  async selectDropdownByValue(element: Locator, value: string) {
 await this.page.waitForTimeout(2000)
     await element.selectOption({ value:value });
  }
  async selectDropdownByVindex(element: Locator, indexno: number) {
 await this.page.waitForTimeout(2000)
     await element.selectOption({ index:indexno });
  }

  async getFirstSelectedOptionText(element: Locator): Promise<string | null> {
 await this.page.waitForTimeout(2000)
    const selected = await element.locator('option:checked').textContent();
    return selected?.trim() || null;
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

//check SlectType:
      async isMultiSelect(element: Locator): Promise<boolean> {
        await element.waitFor();
        const isMultipleAttr = await element.getAttribute('multiple');
        const isMultiple = isMultipleAttr !== null;
    
        if (isMultiple) {
          console.log('Dropdown is: multi-select');
        } else {
          console.log('Dropdown is: single-select');
        }

        return isMultiple; 
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

  /////////////////////////////////// File /////////////////
  
    async fileUpload(element:Locator,filePath:string | string[]){
      await element.setInputFiles(filePath)
    }
  
    async isMultipleFileInput(element: Locator): Promise<boolean> {
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
  async getFrameByElement(selector: string) {
    const frameElement = await this.page.$(selector);
    return await frameElement?.contentFrame();
  }
  
  // Get frame by name handle
  async getFramebyindex(frameName:string){
   return await this.page.frame({name:frameName})
  }
  
  //  Get parent frame of a frame
   async getParentFrame(frame: Frame) {
    return frame.parentFrame();
  }
  
  }
  