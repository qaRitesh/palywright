import * as XLSX from 'xlsx';
import path from 'path';

export class ExcelDataRead {
  excelData: any[]; // store Excel data

  constructor(filePath: string, sheetName: string) {
    // Resolve path from project root
    const absolutePath = path.resolve(process.cwd(), filePath);
    console.log(' Reading Excel from:', absolutePath);

    // Read Excel file
    this.excelData = this.dataReadExcel(absolutePath, sheetName);
  }

  dataReadExcel(filePath: string, sheetName: string) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[sheetName];

      if (!sheet) {
        throw new Error(`Sheet "${sheetName}" not found in file "${filePath}"`);
      }

      const data = XLSX.utils.sheet_to_json(sheet);
      return data;
    } catch (err: any) {
      console.error('Error reading Excel file:', err.message);
      throw err;
    }
  }

  getTestDataById(testCaseID: string) {
    const data = this.excelData.find(row => row.testCaseID === testCaseID);
    if (!data) throw new Error(`Test data not found for ID: ${testCaseID}`);
    return data;
  }
}
