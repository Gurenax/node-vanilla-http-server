function sendJSON(response, object) {
  response.writeHead(response.statusCode, {
    'Content-Type': 'application/json'
  })
  // console.log(typeof object)
  response.end(object)
}

// function replacer(key, value) {
//   // Filtering out properties
//   if (value === '\n') {
//     return undefined;
//   }
//   return value;
// }

function sendCSS(response, css) {
  response.writeHead(response.statusCode, {
    'Content-Type': 'text/css'
  })
  response.end(css)
}

function sendGIF(response, gif) {
  response.writeHead(response.statusCode, {
    'Content-Type': 'image/gif'
  })
  response.end(gif)
}

function sendHTML(response, html) {
  response.writeHead(response.statusCode, {
    'Content-Type': 'text/html'
  })
  // console.log(html)
  
  response.end(`
  <!doctype html>
  <head>
  <link rel="stylesheet" type="text/css" href="/assets/main.css">
  </head>
  <body>
  ${html}
  </body>
  </html>`)
}
      
module.exports = {
  sendJSON, sendHTML, sendCSS, sendGIF
}
