/* eslint-disable @typescript-eslint/no-var-requires */
const data = require("./demo.json");
const { sort } = require("../bystr-sort/dist/index.min");
const fs = require("fs");

const sortString = `
    by word of a greater than b's
`;

const { wordsStats } = data;
const sorted = sort(wordsStats, sortString);

// directory to check if exists
const dir = './assets';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
    recursive: true
  });
}
const onFileWrite = (err, data) => {
  if (!err) { 
    console.log("data well written"); 
  }
  else { console.error(err); }
}

fs.writeFile("./assets/test.json", JSON.stringify({ words: sorted }), onFileWrite );

console.log(sorted);