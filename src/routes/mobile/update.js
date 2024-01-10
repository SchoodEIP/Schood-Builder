/**
 * @memberof module:router~mainRouter
 * @inner
 * @namespace update
 */

const { exec } = require("child_process");

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
    console.log("Update Mobile")

    // Verif received data
    return res.status(500).json({ message: 'Internal Server Error' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
