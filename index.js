const app = require('./app')
const { info } = require('./utils/logger')
const { PORT, url } = require('./utils/config')
const connectToDatabase = require('./mongo')

info('connecting to', url)

// Connect to the MongoDB database
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      info(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
  })