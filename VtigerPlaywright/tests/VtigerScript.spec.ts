import { test, expect } from '@playwright/test';
import { LoginPage } from '../VtigerPom/LoginPage';
import{WebUtil} from"../VtigerPom/Webutil";
import { Common } from '../VtigerPom/Common';
import {ExcelDataRead}from '../TestData/ExcelDataRead'

const excel = new ExcelDataRead('C:/Users/my701/OneDrive/Desktop/VtigerPlaywright/TestData/dataBaseVtiger.xlsx', 'Sheet1');
const testCaseData  = excel.getTestDataById('TC_004');

test(`${testCaseData.testCaseID} - Login test for ${testCaseData.username}`, async ({ page }) => {
  const webutil=new WebUtil(page)
  const login = new LoginPage(page)

await webutil.hitUrl("http://localhost:8888/")
  await login.validLogin(testCaseData .username,testCaseData .password, 'bluelagoon')
  await expect(page).toHaveTitle(/Home/)
  const com = new Common(page)
  await com.marketingModule("Accounts")
  // await home.upcomingToTroubleTickect();
  // await home.topQuotesScroll()

  // await Comm.gotomarketingAccount()
  // await Comm.createBT()
  // await Comm.savetopBT()
});

// test('VT002 Iframes', async ({ page }) => {
//   const webutil=new WebUtil(page)
//   const login = new LoginPage(page)
//   // const Comm=new Common(page)
  
//   await page.goto("http://localhost:8888/")
//   await login.validLogin('admin', 'admin', 'bluelagoon')

//   await expect(page).toHaveTitle(/Home/i)
//   // await Comm.gotomarketingAccount()
//   // await Comm.gmailClick()
// });
