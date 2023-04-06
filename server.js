import express from "express";
import {fromUrl} from "geotiff";
import * as path from "path";
import "main";
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/download', (req, res) => {
    const fileName = 'map.tif';
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = __dirname + '/' + fileName;
    res.sendFile(filePath);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    (async () => {
        const tiff = await fromUrl("http://localhost:3000/download");
        const image = await tiff.getImage();
        const data = await image.readRasters();
        console.log(data);
    })();
});
