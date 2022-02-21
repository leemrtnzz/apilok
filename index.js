const { readFileSync } = require('original-fs')
const express = require('express')
const app = express()


const url = 'https://api.myquran.com/v1/sholat/kota/semua'
app.get('/',(req, res) => {
    res.send('/lokasi?page=[value]&limit=[value] => Membagi data menjadi beberapa page dan limit<br>/semua => Mengambil semua data')
})
app.get('/semua', async (req, res) => {
    // res.json(lokasi)
    try {
        const { data } = await axios.get(url)
        // res.status(200).send(data)
        res.send(data)
    } catch(ex) {
        res.status(500).send(ex.data)
    }
})
app.get('/lokasi', async (req, res) => {
    // try {
    //     const page = req.query.page
    //     const limit = req.query.limit

    //     const startIndex = (page - 1) * limit
    //     const endIndex = page * limit

    //     const result = url.slice(startIndex, endIndex)
    //     res.json(url)
    // }
    try {
        const { data } = await axios.get(url)
        // res.status(200).send(data)
        const page = req.query.page
        const limit = req.query.limit

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        
        const result = data.slice(startIndex, endIndex)

        if (result == 0 ) {
            res.json({"status":false,"data":{"message":"Data tidak di temukan"}})
        } else {
            res.json(result)
        }
    } catch(ex) {
        res.status(500).send(ex.data)
    }
})

app.listen(process.env.PORT || 80, function(){
    console.log('Server Sedang Jalan')
})