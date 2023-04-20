import express from "express";
import {fromUrl, writeArrayBuffer} from "geotiff";
import * as path from "path";
import {exec} from "child_process";

import {blockOperation, create2DArray, movingWindowRectangle} from "./main.js";
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
    exec('gdal_translate -of PNG result.tif output.png', (error, stdout, stderr) => {
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
});

app.get('/movingwindowrectangle', (req, res) => {
    (async () => {
        console.log("got moving window rectangle request");
        const startX = parseInt(req.query.startx);
        const startY = parseInt(req.query.starty);
        const finalX = parseInt(req.query.finalx);
        const finalY = parseInt(req.query.finaly);
        const func = req.query.func;
        const rectanglewidth = parseInt(req.query.rectanglewidth);
        const rectangleheight = parseInt(req.query.reatangleheight);
        let funcToExec = () => {};
        if (func === "Sum") {
            funcToExec = (a) => a.reduce((acc, b) => acc + b, 0);
        } else if (func === "Product") {
            funcToExec = (a) => a.reduce((acc, b) => acc * b, 1)
        }
        const tiff = await fromUrl("http://localhost:3001/download");
        const image = await tiff.getImage();
        const height = image.getHeight();
        const width = image.getWidth();
        const [red, blue, green] = await image.readRasters();
        const red2d = create2DArray(red, height, width);
        const newRed = movingWindowRectangle(red2d, startX, startY, finalX, finalY, funcToExec, rectanglewidth, rectangleheight);
        const blue2d = create2DArray(blue, height, width);
        const newBlue = movingWindowRectangle(blue2d, startX, startY, finalX, finalY, funcToExec, rectanglewidth, rectangleheight);
        const green2d = create2DArray(green, height, width);
        const newGreen = movingWindowRectangle(green2d, startX, startY, finalX, finalY, funcToExec, rectanglewidth, rectangleheight);
        const values = [newRed, newBlue, newGreen];
        const metadata = {
            height: newRed.length,
            width: newRed[0].length,
            SamplesPerPixel: 3,
            SampleFormat: [1, 1, 1],
            BitsPerSample: [8, 8, 8],
            PhotometricInterpretation: 6,
            PlanarConfiguration: 1
        };
        const arrayBuffer = await writeArrayBuffer(values, metadata);
        fs.writeFileSync('result.tif', Buffer.from(arrayBuffer));
        res.send('finished');
        console.log('ready');
    })();
});

app.get('/blockoperation', (req, res) => {
    (async () => {
        console.log("got block operation req");
        const blockwidth = parseInt(req.query.blockwidth);
        const blockheight = parseInt(req.query.blockheight);
        const func = req.query.func;
        let funcToExec = () => {};
        if (func === "Sum") {
            funcToExec = (a) => a.reduce((acc, b) => acc + b, 0);
        } else if (func === "Product") {
            funcToExec = (a) => a.reduce((acc, b) => acc * b, 1);
        }
        const tiff = await fromUrl("http://localhost:3001/download");
        const image = await tiff.getImage();
        const height = image.getHeight();
        const width = image.getWidth();
        const [red, blue, green] = await image.readRasters();
        const red2d = create2DArray(red, height, width);
        const newRed = blockOperation(red2d, blockwidth, blockheight, funcToExec);
        const blue2d = create2DArray(blue, height, width);
        const newBlue = blockOperation(blue2d, blockwidth, blockheight, funcToExec);
        const green2d = create2DArray(green, height, width);
        const newGreen = blockOperation(green2d, blockwidth, blockheight, funcToExec);
        const values = [newRed, newBlue, newGreen];
        const metadata = {
            height: newRed.length,
            width: newRed[0].length,
            SamplesPerPixel: 3,
            SampleFormat: [1, 1, 1],
            BitsPerSample: [8, 8, 8],
            PlanarConfiguration: 1
        };
        const arrayBuffer = await writeArrayBuffer(values, metadata);
        fs.writeFileSync('result.tif', Buffer.from(arrayBuffer));
        res.send('finished');
        console.log('ready');
    })();
})

app.listen(3001, () => {
    console.log('Server listening on port 3001');
    (async () => {

    })();
});
