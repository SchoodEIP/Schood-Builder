const express = require('express')
const https = require('https')
const http = require('http')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config({ path: '../.env' })
const RateLimit = require('express-rate-limit')

const app = express()
const httpPort = process.env.HTTP_EXPRESS_PORT
const httpsPort = process.env.HTTPS_EXPRESS_PORT
const router = require('./routes/router.js')
const sanitizer = require('./middleware/sanitize')

/**
 * Set limiter
 */
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20
})

const corsOptions = {
  origin: [
    'http://localhost:8082',
    'https://localhost:8082',
    'http://localhost',
    'https://localhost',
    'http://localhost:8083',
    'https://localhost:8083',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://schood.fr:8082',
    'https://schood.fr:8082',
    'http://schood.fr',
    'https://schood.fr',
    'http://schood.fr:8083',
    'https://schood.fr:8083'
  ],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Cache-Control'],
  methods: ['GET']
}

/**
 * Start the Node.Js server
 */
async function startServer () {
    try {
        app.use(cors(corsOptions))
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        if (process.env.PROD === 'true') {
          app.use(limiter)
        }
        // Init router
        app.use('/', sanitizer, router)
  
        // Start server
        console.info('INFO: START HTTP SERVER' + ' (http://localhost:' + httpPort + ')')
  
        const serverHttp = http.createServer(app)
        serverHttp.listen(httpPort)
  
        if (process.env.HTTPS === 'true') {
          /**
           * Set keys files
           */
          const options = {
            key: fs.readFileSync('./key.pem'),
            cert: fs.readFileSync('./cert.pem'),
            ca: fs.readFileSync('./ca.pem')
          }
  
          console.info('INFO: START HTTPS SERVER' + ' (https://localhost:' + httpsPort + ')')
          const serverHttps = https.createServer(options, app)
          serverHttps.listen(httpsPort)
        }
        console.log('=============================================')
      } catch (error) {
        console.error('ERROR: index.js error : ', error)
      }
}

startServer()
