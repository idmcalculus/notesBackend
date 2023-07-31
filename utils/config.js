require('dotenv').config()

const PORT = process.env.PORT || 3006
const url = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { PORT, url }