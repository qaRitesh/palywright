import * as XLSX from 'xlsx';
import path from 'path';
import { test, expect } from '@playwright/test';

// ---------- Step 1: Resolve absolute path ----------
const excelFilePath = path.resolve('C:/Users/my701/OneDrive/Desktop/VtigerPlaywright/TestData/dataBaseVtiger.xlsx');
console.log('Resolved Excel path:', excelFilePath); // debug

// ---------- Step 2: Read Excel ----------
let excelData: { testCaseID: string; 
                username: string; 
                password: string; 
                expectedResult: string;
             }
             [] = [];

try {
    const workbook = XLSX.readFile(excelFilePath);
    const sheet = workbook.Sheets['Sheet1'];
    excelData = XLSX.utils.sheet_to_json(sheet) as any[];
    console.log('Excel Data:', excelData); // debug
} catch (err) {
    console.error('Error reading Excel file:', err);
    process.exit(1); // stop execution if file not found
}

const testCaseToRun = 'TC_004'; // the test case you want
const row = excelData.find(r => r.testCaseID === testCaseToRun);
// ---------- Step 3: Data-driven tests ----------
// if (!row) {
//     console.error(`Test case ${testCaseToRun} not found in Excel`);
//     process.exit(1);
// }

 for (const row of excelData) {
test(`${row.testCaseID} - Login test for ${row.username}`, async ({ page }) => {
        await page.goto('http://localhost:8888/'); // replace with your app URL

        await page.fill('//input[@name="user_name"]', row.username);
        await page.fill('//input[@name="user_password"]', row.password);
        await page.click("//input[@name='Login']");

        if (row.expectedResult === 'success') {
            await expect(page).toHaveURL(/Home/); // replace with actual URL
        } else {
            const errorMsg = page.locator('.error-message'); // replace with actual selector
            await expect(errorMsg).toBeVisible();
        }
    });
}