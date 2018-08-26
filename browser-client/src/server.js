
const express = require('express')
const path = require('path')

const run = () => {
  const app = express()

  app.use(express.static(path.join(__dirname, 'client/public')))
  app.use(express.static(path.join(__dirname, 'client/dist')))

  app.get('/*', (req, res) => {
    res.sendFile('client/index.html', { root: __dirname });
  })

  app.listen(8081,()=>{
    console.log('listening on ','http:://localhost:8081');
  });
}

module.exports = {
  run
}
