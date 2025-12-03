import  * as EXCEl from 'xlsx';
import fs from 'fs';

interface TestRecond{
    Skill1:string;
    Skill2:string;
}

export function readExcelFile(filePath:string){
    // Read the excel file as binary string.
    const file=fs.readFileSync(filePath);

    //parse into workbook
    const workbook=EXCEl.read(file);

    //Get first sheet.
    const sheet=workbook.Sheets[workbook.SheetNames[0]];

    //convert sheet into json.
        const rawData:any[]=EXCEl.utils.sheet_to_json(sheet,{header:1})

    //convert raw data into TesteRcord.
    rawData.slice(1).map((column:any)=>({
        Skill1: column[0];
        Skill2: column[0];
    }))

}