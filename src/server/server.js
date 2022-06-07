import express from "express";

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
