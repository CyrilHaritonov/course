import express from "express";
import {fromUrl, writeArrayBuffer} from "geotiff";
import * as path from "path";
import {exec} from "child_process";

import {
    blockOperation,
    create2DArray,
    movingWindowCircle,
    movingWindowRectangle,
    movingWindowRing,
    movingWindowSector
} from "./main.js";
import * as fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());
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
    const fileName = 'map.png';
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
        const rectangleWidth = parseInt(req.query.rectanglewidth);
        const rectangleHeight = parseInt(req.query.rectangleheight);
        console.log(startX, startY, finalX, finalY, func, rectangleWidth, rectangleHeight);
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
        const newRed = movingWindowRectangle(red2d, startX, startY, finalX, finalY, funcToExec, rectangleWidth, rectangleHeight);
        const blue2d = create2DArray(blue, height, width);
        const newBlue = movingWindowRectangle(blue2d, startX, startY, finalX, finalY, funcToExec, rectangleWidth, rectangleHeight);
        const green2d = create2DArray(green, height, width);
        const newGreen = movingWindowRectangle(green2d, startX, startY, finalX, finalY, funcToExec, rectangleWidth, rectangleHeight);
        const values = [newRed, newGreen, newBlue];
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

app.get('/movingwindowcircle', (req, res) => {
    (async () => {
        console.log("got moving window circle request");
        const startX = parseInt(req.query.startx);
        const startY = parseInt(req.query.starty);
        const finalX = parseInt(req.query.finalx);
        const finalY = parseInt(req.query.finaly);
        const func = req.query.func;
        const radius = parseInt(req.query.radius);
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
        const newRed = movingWindowCircle(red2d, startX, startY, finalX, finalY, funcToExec, radius);
        const blue2d = create2DArray(blue, height, width);
        const newBlue = movingWindowCircle(blue2d, startX, startY, finalX, finalY, funcToExec, radius);
        const green2d = create2DArray(green, height, width);
        const newGreen = movingWindowCircle(green2d, startX, startY, finalX, finalY, funcToExec, radius);
        const values = [newRed, newGreen, newBlue];
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

app.get('/movingwindowring', (req, res) => {
    (async () => {
        console.log("got moving window ring request");
        const startX = parseInt(req.query.startx);
        const startY = parseInt(req.query.starty);
        const finalX = parseInt(req.query.finalx);
        const finalY = parseInt(req.query.finaly);
        const func = req.query.func;
        const innerRadius = parseInt(req.query.innerradius);
        const outerRadius = parseInt(req.query.outerradius);
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
        const newRed = movingWindowRing(red2d, startX, startY, finalX, finalY, funcToExec, outerRadius, innerRadius);
        const blue2d = create2DArray(blue, height, width);
        const newBlue = movingWindowRing(blue2d, startX, startY, finalX, finalY, funcToExec, outerRadius, innerRadius);
        const green2d = create2DArray(green, height, width);
        const newGreen = movingWindowRing(green2d, startX, startY, finalX, finalY, funcToExec, outerRadius, innerRadius);
        const values = [newRed, newGreen, newBlue];
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

app.get('/movingwindowsector', (req, res) => {
    (async () => {
        console.log("got moving window sector request");
        const startX = parseInt(req.query.startx);
        const startY = parseInt(req.query.starty);
        const finalX = parseInt(req.query.finalx);
        const finalY = parseInt(req.query.finaly);
        const func = req.query.func;
        const radius = parseInt(req.query.radius);
        const sectorStart = parseInt(req.query.sectorstart);
        const sectorEnd = parseInt(req.query.sectorend);
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
        const newRed = movingWindowSector(red2d, startX, startY, finalX, finalY, funcToExec, radius, sectorStart, sectorEnd);
        const blue2d = create2DArray(blue, height, width);
        const newBlue = movingWindowSector(blue2d, startX, startY, finalX, finalY, funcToExec, radius, sectorStart, sectorEnd);
        const green2d = create2DArray(green, height, width);
        const newGreen = movingWindowSector(green2d, startX, startY, finalX, finalY, funcToExec, radius, sectorStart, sectorEnd);
        const values = [newRed, newGreen, newBlue];
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
        const values = [newRed, newGreen, newBlue];
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
