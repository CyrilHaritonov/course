import express from "express";
import {fromUrl, writeArrayBuffer} from "geotiff";
import * as path from "path";
import {createRequire} from "module";
import {exec} from "child_process";

import {blockOperation, create2DArray, neighbourhoodRectangle} from "./main.js";
import * as fs from "fs";

const app = express();
app.get('/', (req, res) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/download', (req, res) => {
    const fileName = 'map.tif';
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = __dirname + '/' + fileName;
    res.sendFile(filePath);
});

app.get('/getpng', (req, res) => {
    const fileName = 'output.png';
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = __dirname + '/' + fileName;
    res.sendFile(filePath);
});

app.get('/generatepng', (req, res) => {
    exec('gdal_translate -of PNG map.tif output.png', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
    setTimeout(() => {
        const fileName = 'output.png';
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const filePath = __dirname + '/' + fileName;
        res.sendFile(filePath);
    }, 6000);
})
app.listen(3001, () => {
    console.log('Server listening on port 3001');
    (async () => {
        const tiff = await fromUrl("http://localhost:3001/download");
        const image = await tiff.getImage();
        const height = image.getHeight();
        const width = image.getWidth();
        const [red, blue, green] = await image.readRasters();
        const red2d = create2DArray(red, height, width);
        const newRed = blockOperation(red2d, 4, 4, (a) => a.reduce((acc, b) => acc + b, 0));
        const blue2d = create2DArray(blue, height, width);
        const newBlue = blockOperation(blue2d, 4, 4, (a) => a.reduce((acc, b) => acc + b, 0));
        const green2d = create2DArray(green, height, width);
        const newGreen = blockOperation(green2d, 4, 4, (a) => a.reduce((acc, b) => acc + b, 0));
        const values = [newRed, newBlue, newGreen];
        console.log(image);
        const metadata = {
            height: newRed.length,
            width: newRed[0].length,
            SamplesPerPixel: 3,
            SampleFormat: [1, 1, 1],
            BitsPerSample: [8, 8, 8],
            PhotometricInterpolation: 6,
            PlanarConfiguration: 1
        };
        // console.log(newRed);
        const arrayBuffer = await writeArrayBuffer(values, metadata);
        fs.writeFileSync('result.tif', Buffer.from(arrayBuffer));
        console.log('ready');
    })();
});
