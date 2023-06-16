const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`This is my first Express Web Site!`)
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})