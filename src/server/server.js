import express from "express";
import fs from 'fs';
const app = express();

import dotenv from 'dotenv'

let port = 8080; 
try {
    const env = dotenv.config();
    port = env.parsed.PORT
} catch(e) {}


app.listen(port, () => {
    console.log(`Listening on port ${port}`);    
});


app.get("/", (req, res, next) => {
    
    res.send(fs.readFileSync('src/app/index.html', 'utf-8'));

})


app.use('/', express.static('public'));
