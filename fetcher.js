const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const pageContent = args[0];
const writeTo = args[1];

// use callback to do something once in this case, fetch is complete. in the callback of the request. 
const fetchAndSave = (url, saveTo) => {
  request(url, (error, response, body) => {
    fs.writeFile(saveTo, body, (err) => {
      console.log(`Downloaded and saved ${body.length} bytes to ${saveTo}`);
    })
  })
};

fetchAndSave(pageContent, writeTo);