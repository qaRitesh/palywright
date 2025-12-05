import * as XLSX from 'xlsx';
import path from 'path';
import { test, expect } from '@playwright/test';
import { WebUtil } from "../VtigerWebutile/webUtil";
import { LoginAction } from '../VtigerPom/LoginPageAction';

// ---------- Step 1: Resolve Excel Path ----------
const excelFilePath = path.resolve('C:/Users/my701/OneDrive/Desktop/VtigerPlaywright/TestData/dataBaseVtiger.xlsx');
console.log('Resolved Excel path:', excelFilePath);

// ---------- Step 2: Read Excel ----------
let excelData: { 
  testCaseID: string; 
  url: string; 
  username: string; 
  password: string; 
  themeLabel: string; 
  expectedResult: string; 
}[] = [];

try {
  const workbook = XLSX.readFile(excelFilePath);
  const sheet = workbook.Sheets['LoginData'];
  excelData = XLSX.utils.sheet_to_json(sheet) as any[];
} catch (err) {
  console.error('Error reading Excel file:', err);
  process.exit(1);
}

// ---------- Step 3: Data-Driven Test ----------
for (const row of excelData) {
  test(`${row.testCaseID} - Login test for ${row.username}`, async ({ page }) => {
    
    const util = new WebUtil(page);
    const login = new LoginAction(page);

    await util.goToUrl(row.url);
    await login.validateLogin(row.username, row.password, row.themeLabel);
    if (row.expectedResult.toLowerCase() === 'success') {
      await expect(page).toHaveURL(/Home/);
    } else {
      const errorMsg = page.locator('.error-message'); // update selector
      await expect(errorMsg).toBeVisible();
    }
  });
}
