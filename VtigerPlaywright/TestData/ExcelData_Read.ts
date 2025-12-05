import * as XLSX from 'xlsx';
import path from 'path';

export class Base {
  excelData: any[];

  constructor(filePath: string, sheetName: string) {
    // Since Excel is in project root, just give relative path from project root
    const absolutePath = path.resolve(process.cwd(), filePath);
    console.log('📘 Reading Excel from:', absolutePath);

    this.excelData = this.DataReadExcel(absolutePath, sheetName);
  }

  private DataReadExcel(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);      // read file
    const sheet = workbook.Sheets[sheetName];      // get sheet
    if (!sheet) throw new Error(`Sheet "${sheetName}" not found`);
    const data = XLSX.utils.sheet_to_json(sheet);  // convert to JSON
    return data;
  }

  getTestDataById(testCaseID: string) {
    const data = this.excelData.find(row => row.testCaseID === testCaseID);
    if (!data) throw new Error(`Test data not found for ID: ${testCaseID}`);
    return data;
  }
}
