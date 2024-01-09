/**
 * @memberof module:router~mainRouter
 * @inner
 * @namespace update
 */

const { exec } = require("child_process");

/**
 * Main backend update function
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
    // Removing old docker containers
    exec("docker stop schood-api-api-1", (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        throw error;
      }
      if (stderr) {
        console.error(stderr)
        throw stderr;
      }
      exec("docker stop schood-api-mongodb-1", (error, stdout, stderr) => {
        if (error) {
          console.error(error)
          throw error;
        }
        if (stderr) {
          console.error(stderr)
          throw stderr;
        }
        exec("docker rm schood-api-api-1", (error, stdout, stderr) => {
          if (error) {
            console.error(error)
            throw error;
          }
          if (stderr) {
            console.error(stderr)
            throw stderr;
          }
          exec("docker rm schood-api-mongodb-1", (error, stdout, stderr) => {
            if (error) {
              console.error(error)
              throw error;
            }
            if (stderr) {
              console.error(stderr)
              throw stderr;
            }
            // Pulling new data
            exec("cd /home/schood/schood/Schood-API && git checkout main && git pull", (error, stdout, stderr) => {
              if (error) {
                console.error(error)
                throw error;
              }
              if (stderr) {
                console.error(stderr)
              }
              // Starting new server
              exec("cd /home/schood/schood/Schood-API && docker-compose up --build --detach", (error, stdout, stderr) => {
                if (error) {
                  console.error(error)
                  throw error;
                }
                if (stderr) {
                  console.error(stderr)
                  throw stderr;
                }
                console.log("Updated Backend")
                return res.status(200).send();
              })
            })
          })
        })
      })
    })
    return res.status(500).json({ message: 'Internal Server Error' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
