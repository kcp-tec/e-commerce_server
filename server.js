const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`NodeJS running at ${process.env.PORT}`)
})


