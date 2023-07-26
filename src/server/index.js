var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

const base = 'https://api/meaningcloud.com/sentiment-2.1?'
const APIkey = process.env.API_KEY
let entry = []

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/api', async function(req,res){
    entry = req.body.url
    console.log(`Your Input: ${entry}`)
    const APIurl = `${base}key=${APIkey}&url=${entry}&lang=en`
    const response = await fetch(APIurl)
    const results = await response.json()
    console.log(results)
    res.send(results)
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
