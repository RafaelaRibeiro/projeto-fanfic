const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require("morgan")
const express = require('express')
const path = require('path')


module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/files', express.static(path.resolve(__dirname, '..','tmp', 'perfil')))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // app.use(morgan('dev'))
}