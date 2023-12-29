const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const fs = require('fs');

async function writeToExcel(data) {
    console.log(data);
    const date = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Bangkok', // specify the time zone
    };

    const formattedDate = date.toLocaleString('en-US', options).replace(/[/: ]/g, '_');
    const fileName = `data_${formattedDate.split(',')[0]}.xlsx`;
    // const outputDir = path.join(__dirname, '../../Report');
    
    const outputDir = 'C:\\Users\\Tanawat';
    // const outputDir = 'C:\\Users\\admin\\Desktop\\Report';
    const filePath = path.join(outputDir, fileName);

    try {
        // Check if the output directory exists, create it if not
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        let workbook;

        // Read existing workbook if it exists, otherwise create a new one
        try {
            workbook = await XlsxPopulate.fromFileAsync(filePath);
        } catch (readError) {
            workbook = await XlsxPopulate.fromBlankAsync();
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
        }else{
            // Add the new data to the worksheet
            sheet.cell(lastRowNumber + 1, 1).value(data.datetime);
            sheet.cell(lastRowNumber + 1, 2).value(data.temperature);
            sheet.cell(lastRowNumber + 1, 3).value(data.humidity);
            // Set the alignment for the new data row
            sheet.row(lastRowNumber + 1).style({ horizontalAlignment: 'left' });
        }
        // Write the updated workbook back to the file
        await workbook.toFileAsync(filePath);

        console.log('Excel file updated:', filePath);
    } catch (error) {
        console.error('Error writing to Excel file:', error.message);
        throw error;
    }
}

module.exports = {
    writeToExcel,
};
