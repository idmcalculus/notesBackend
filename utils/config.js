require('dotenv').config()

const PORT = process.env.PORT || 3006
const url = process.env.CONNECTION_URL

module.exports = { PORT, url }