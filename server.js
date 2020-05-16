const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.url}`);

  next()
})

app.use(express.static('build'))

app.listen(port, () => { console.log(`Server start to listen on port ${port}`) })