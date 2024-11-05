const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey); // Output will be a secure 64-character hexadecimal string
