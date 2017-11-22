const HTTP = require('http')
const { sendJSON, sendHTML, sendCSS, sendGIF } = require('./utils')
const FS = require('fs')
// const Path = require('path')

// Create the server
const server = HTTP.createServer((request, response) => {
  const path = request.url
  console.log('Request received', path)
  if (path === '/') {
    response.end('Home')
  } else if (path === '/opensesame') {
    response.end('TOP SECRET!!!')
  } else if (path === '/postcode.json') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.end(`{"name": "Melbourne", "postcode": "3000"}`)

  } else if (path.startsWith('/postcode/')) {
    postCode = path.replace(new RegExp('/postcode/'),'')
    FS.readFile(`postcodes/${postCode}`, 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404)
        sendJSON(response, JSON.stringify( {'error': 'Page not found'} ))
      }
      else {
        sendJSON(response, data)
      }
    });
    
  } else if (path === '/about') {
    sendHTML(response, `
      <h1>About</h1>
      <p>This is a paragraph</p>
      <image src="/assets/example.gif"/>
      <image src="/assets/example.gif"/>
      <image src="/assets/example.gif"/>
      <image src="/assets/example.gif"/>
    `)

  } else if (path === '/assets/main.css') {
    FS.readFile('assets/main.css', 'utf8', (err, data) => {
      if (err) {
        response.writeHead(404)
        sendJSON(response, JSON.stringify( {'error': 'Page not found'} ))
      }
      else {
        sendCSS(response, data)
      }
    });

  } else if (path === '/assets/example.gif') {
    FS.readFile('assets/example.gif', (err, data) => {
      if (err) {
        response.writeHead(404)
        sendJSON(response, JSON.stringify( {'error': 'Page not found'} ))
      }
      else {
        sendGIF(response, data)
      }
    });

  } else {
    response.writeHead(404)
    sendJSON(response, JSON.stringify( {'error': 'Page not found'} ))
    // response.writeHead(404)
    // response.end('Page not found')
  }
})

// Start the server
server.listen(7000, error => {
  console.log('Server has started at http://localhost:7000')
})
