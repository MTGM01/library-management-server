const path = require('path')

console.log(__filename);
console.log(__dirname);

console.log(path.basename(__filename));
console.log(path.basename(__dirname));

console.log(path.extname(__filename));
console.log(path.extname(__dirname));

console.log(path.parse(__filename));
console.log(path.parse(__dirname));

console.log(path.normalize(__dirname + '////'));

console.log(path.join(__dirname, '../images/svg.js'));

