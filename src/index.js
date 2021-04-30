const express = require('express')
const app = express()
const port = 3000
const { getPathInfo } = require('./controller/path');
const cors = require('cors')
app.use(cors())
app.use('/path', (req, res) => {
  const pathInfo = getPathInfo(req.path);
  if (pathInfo === null) {
    res.sendStatus(404);
  }
  res.json(pathInfo);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
