"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const fs = require('fs');
function writeToExcel(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        const outputDir = path.join(__dirname, '../../Report');
        const fileName = `data_${new Date().toISOString().split('T')[0]}.xlsx`;
        const filePath = path.join(outputDir, fileName);
        try {
            // Check if the output directory exists, create it if not
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }
            let workbook;
            // Read existing workbook if it exists, otherwise create a new one
            try {
                workbook = yield XlsxPopulate.fromFileAsync(filePath);
            }
            catch (readError) {
                workbook = yield XlsxPopulate.fromBlankAsync();
                workbook.sheet(0).name('data');
            }
            const sheet = workbook.sheet('data');
            // Assuming data structure: { datetime, rssi, temp }
            sheet.column('A').style('numberFormat', 'yyyy-mm-dd hh:mm:ss');
            // Check if the sheet has any used cells
            const lastRowNumber = sheet.usedRange() ? sheet.usedRange().endCell().rowNumber() : 0;
            // If the sheet is empty, add headers
            if (lastRowNumber === 0) {
                sheet.cell(1, 1).value('Datetime');
                sheet.cell(1, 2).value('Temperature');
                sheet.cell(1, 3).value('Humidity');
                // Set the alignment for the header
                sheet.row(1).style({ horizontalAlignment: 'center' });
                // Add the new data to the worksheet
                sheet.cell(lastRowNumber + 2, 1).value(data.datetime);
                sheet.cell(lastRowNumber + 2, 2).value(data.temperature);
                sheet.cell(lastRowNumber + 2, 3).value(data.humidity);
                sheet.row(lastRowNumber + 2).style({ horizontalAlignment: 'left' });
            }
            else {
                // Add the new data to the worksheet
                sheet.cell(lastRowNumber + 1, 1).value(data.datetime);
                sheet.cell(lastRowNumber + 1, 2).value(data.temperature);
                sheet.cell(lastRowNumber + 1, 3).value(data.humidity);
                // Set the alignment for the new data row
                sheet.row(lastRowNumber + 1).style({ horizontalAlignment: 'left' });
            }
            // Write the updated workbook back to the file
            yield workbook.toFileAsync(filePath);
            console.log('Excel file updated:', filePath);
        }
        catch (error) {
            console.error('Error writing to Excel file:', error.message);
            throw error;
        }
    });
}
module.exports = {
    writeToExcel,
};
