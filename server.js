const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()


const allowedOrigins = ['http://localhost:3185', 'https://prisign-brahma.netlify.app']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
}))

app.use(createProxyMiddleware({
  router: (req) => new URL(req.path.substring(1)),
  pathRewrite: (path, req) => (new URL(req.path.substring(1))).pathname,
  changeOrigin: true,
  logger: console
}))

app.listen(8088, () => {
  console.info('proxy server is running on port 8088')
})