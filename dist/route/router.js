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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const excel_1 = require("../services/excel");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/getdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield (0, excel_1.writeToExcel)(data);
        res.json({ status: 'complete' });
    }
    catch (error) {
        console.error('Error processing /rut955:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/test', (req, res) => {
    console.log(req.body);
    res.json({ status: "ok" });
});
module.exports = router;
