const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.disable('etag')
app.disable('x-powered-by')

app.use(cookieParser())
app.use('/__gtg', (req, res) => 
  res
    .header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    .send('OK')
)
app.use((req, res) =>
  res
    .header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    .status(req.headers['Dummy-Status'] || 200)
    .json({
      cookies: req.cookies,
      headers: req.headers,
      hostname: req.hostname,
      method: req.method,
      url: req.url
    })
)

const listener = app.listen(process.env.PORT || 3000, err => {
    if (err) throw err
    const {address,port} = listener.address()
    console.info(`Serving on ${address} ${port}.`)
})
