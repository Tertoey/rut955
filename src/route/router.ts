import {writeToExcel} from '../services/excel'
import  express ,{Request,Response}  from 'express'
import dbCon from '../model/dbCon'
const router = express.Router()

router.post('/getdata',async(req:Request,res:Response)=>{
    try {
        console.log(req.body);
        const datetime = req.body.Timestamp;
        const temperature = req.body.temperature;
        const humidity = req.body.humidity;
        const data = {
            datetime: datetime,
            temperature: temperature,
            humidity: humidity,
        };
    
        // Call the writeToExcel function to append data to Excel file
        await writeToExcel(data);
    
        res.json({ status: 'complete' });
    } catch (error:any) {
        console.error('Error processing /rut955:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/test', (req, res) => {
    const dataArray = req.body;

  if (Array.isArray(dataArray) && dataArray.length > 1) {
    // Initialize mergedArray with the first object
    let mergedArray = [dataArray[0]];

    // Loop through the array starting from the second element
    for (let i = 1; i < dataArray.length; i++) {
      // Extract the current and previous objects
      const currentObj = dataArray[i];
      const previousObj = mergedArray[mergedArray.length - 1];

      // Check if the timestamps are the same, merge the objects
      if (currentObj.Timestamp === previousObj.Timestamp) {
        mergedArray[mergedArray.length - 1] = { ...previousObj, ...currentObj };
      } else {
        // If timestamps are different, add the current object to the mergedArray
        mergedArray.push(currentObj);
      }
    }
    mergedArray.forEach((data)=>{
        const inputDateString = data.Timestamp;
        const parts = inputDateString.split(/\s+/);
        const dateParts = parts[0].split('/').reverse().join('-');
        const timePart = parts[1];
        const timestamp = `${dateParts} ${timePart}`;
        const temperature = data.Temperature/10;
        const rssi = data.RSSI
        dbCon.query(
            'INSERT INTO rut955 (Timestamp,rssi,temp) VALUES (?,?,?)',
            [timestamp, rssi, temperature],
            function(err, result) {
                if(result){
                    console.log(result+"123")
                }else(
                    console.log(err+"123333")
                )
            }
        )
        console.log(data)
    })
    res.json(mergedArray);
  } else {
    res.status(400).json({ error: 'Invalid data format' });
  }
});

module.exports=router