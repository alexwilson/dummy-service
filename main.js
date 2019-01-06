#!/usr/bin/env node

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
app.use((req, res) => {
  // Simulate a stalled origin.
  if (req.get('Dummy-Delay')) {
    const send = res.send;
    res.send = (...args) => setTimeout(_ => {
            send.apply(res, args)
    }, req.get('Dummy-Delay'))
  }

  // Initialise the response.
  const response = res
    .header('Cache-Control', req.header('Dummy-Cache-Control') || 'private, no-cache, no-store, must-revalidate')
    .status(req.header('Dummy-Status') || 200)

  // Override the response if a body has been specified.
  return (req.header('Dummy-Response')) ?
    response
      .send(req.header('Dummy-Response')) :
    response
      .json({
        cookies: req.cookies,
        headers: req.headers,
        hostname: req.hostname,
        method: req.method,
        url: req.url
      })
})

const listener = app.listen(process.env.PORT || 3000, err => {
    if (err) throw err
    const {address,port} = listener.address()
    console.info(`Serving on ${address} ${port}.`)
})
