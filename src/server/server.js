import express from "express";
import fs from 'fs';
const app = express();

const port = process.env.server_port || 3111;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
});

app.use((req, res, next) => {

    // These headers are required for SharedArrayBuffer to work on app 
    res.set({
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
    })
    next();
})

app.use('/', express.static('dist/public'));

app.get(['/about', "^/table/:tableId"], (req, res, next) => {
    res.send(fs.readFileSync('src/app/index.html', 'utf-8'));
});
