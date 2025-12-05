import { test, expect } from '@playwright/test';
import { Base } from '../TestData/ExcelData_Read';
import { WebUtil } from "../VtigerWebutile/webUtil";
import { LoginAction } from '../VtigerPom/LoginPageAction';


const base = new Base('C:/Users/my701/OneDrive/Desktop/TortoiseGit/palywright/VtigerPlaywright/TestData/dataBaseVtiger.xlsx', 'LoginData');

test('Login test using Excel data', async ({ page }) => {
  const testData = base.getTestDataById('TC_004');
  const util = new WebUtil(page);
  const login = new LoginAction(page);

  await util.goToUrl(testData.url);
  await login.validateLogin(testData.username, testData.password, testData.themeDropdown);
  await page.waitForLoadState()
await page.waitForLoadState();
      await expect(page).toHaveURL(/Home/);
});
