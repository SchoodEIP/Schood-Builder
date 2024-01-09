/**
 * @memberof module:router~mainRouter
 * @inner
 * @namespace update
 */

/**
 * Main mobile update function
 * @name GET /web
 * @function
 * @memberof module:router~mainRouter
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 500 if Internal Server Error
 */
module.exports = async (req, res) => {
  try {
    // Verif received data
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
