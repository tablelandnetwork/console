import express from "express";
import fs from 'fs';
const app = express();

import dotenv from 'dotenv'
const env = dotenv.config();
console.log(env);


const port = env.parsed.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
});


app.use((req, res, next) => {

    // These headers are required for SharedArrayBuffer to work on app 
    res.set({
        'Access-Control-Allow-Origin': '*'
        // 'Cross-Origin-Opener-Policy': 'same-origin',
        // 'Cross-Origin-Embedder-Policy': 'require-corp'
    })
    next();
})


app.get("/", (req, res, next) => {
    res.send(fs.readFileSync('src/app/index.html', 'utf-8'));

})


app.use('/', express.static('dist/public'));

app.get(['/about', '/table-design', "^/table/:tableId", "/browse", "/my-tables", "/execute", "/chain/:chainId/table/:tableId", "/table"], (req, res, next) => {
    res.send(fs.readFileSync('src/app/index.html', 'utf-8'));
});
