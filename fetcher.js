const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv.slice(2);
const pageUrl = args[0];
const writePath = args[1];

// use callback to do something once in this case, fetch is complete. in the callback of the request. 
const fetchAndSave = (url, saveTo) => {
  // Edge case - file path invalid
  if (saveTo.slice(0, 2) !== './') {
    console.log('Path invalid');
    rl.close();
    return;
  }
  // Edge case - file exists already - works fine
  if (fs.existsSync(saveTo)) {
    rl.question('Path already exists, do you want to overwrite? ', (yesNo) => {
      if (yesNo === 'no' || yesNo === 'n') {
        rl.close();
      } 
      
      if (yesNo === 'yes' || yesNo === 'y') {
        request(url, (error, response, body) => {
          // Edge case - Invalid URL
          if (response.statusCode === 404) {
            console.log('Invalid URL');
            rl.close();
            return;
          }
          fs.writeFile(saveTo, body, (err) => {
            console.log(`Downloaded and saved ${body.length} bytes to ${saveTo}`);
            rl.close();
          })
        });
      }

    })
  }
};

fetchAndSave(pageUrl, writePath);