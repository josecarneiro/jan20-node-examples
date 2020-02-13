const dotenv = require('dotenv');
dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;
const omdbApiKey = process.env.OMDB_API_KEY;

console.log(googleApiKey, omdbApiKey);
console.log(process.env);
