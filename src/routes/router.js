/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const web = require('./web/update')
const mobile = require('./mobile/update')
const backend = require('./backend/update')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.get('/web', web)
router.get('/mobile', mobile)
router.get('/backend', backend)

module.exports = router
