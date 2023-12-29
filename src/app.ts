import express  from "express";
import bodyParser from "body-parser";
const Router = require('./route/router')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(Router)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})