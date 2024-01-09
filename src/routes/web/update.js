/**
 * @memberof module:router~mainRouter
 * @inner
 * @namespace update
 */

const { exec } = require("child_process");

/**
 * Main web update function
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
    exec("cd /var/www/Schood-WEB && git pull", (error, stdout, stderr) => {
        if (error) {
          console.error("a: ",error)
          throw error;
        }
        if (stderr) {
            console.error(stderr)
        }
        exec("cd /var/www/Schood-WEB && npm ci && npm run build", (error, stdout, stderr) => {
          if (error) {
            console.error(error)
            throw error;
          }
          if (stderr) {
            console.error(stderr)
            throw stderr;
          }
          console.log(stdout)
          console.log("Updated Web")
          return res.status(200).send();
        })
      })
      return res.status(500).json({ message: 'Internal Server Error' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
