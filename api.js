const { readFileSync } = require('original-fs')
const express = require('express')
const app = express()


const lokasi = JSON.parse(readFileSync('src/lokasi.json'))
app.get('/lokasi', (req, res) => {
    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const result = lokasi.slice(startIndex, endIndex)
    res.json(result)
})

app.listen(process.env.PORT || 80, function(){
    console.log('Server Sedang Jalan')
})