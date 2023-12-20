const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()

const doc = {
  info: {
    title: 'E-Commerce',
    description: 'Api'
  },
  host: `localhost:${process.env.PORT}`,
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Some description...'
  }
}
}

const outputFile = './swagger-output.json'
const routes = ['./server.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc)