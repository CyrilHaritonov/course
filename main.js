function neighbourhoodRectangle(array, width, height, x, y) {
    let result = [];
    let leftOffset = Math.ceil(width / 2);
    let rightOffset = Math.floor(width / 2);
    let topOffset = Math.ceil(height / 2);
    let botOffset = Math.floor(height / 2);
    for (let i = y - topOffset; i <= y + botOffset; i++) {
        for (let j = x - leftOffset; j <= x + rightOffset; j++) {
            if (i >= 0 && i < array.length && j >= 0 && array[i].length > j) {
                result.push(array[i][j]);
            }
        }
    }
    return result;
}

function neighbourhoodCircle(array, radius, x, y) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let distance = Math.sqrt((j - x) ** 2 + (i - y) ** 2);
            if (distance <= radius) {
                result.push(array[i][j]);
            }
        }
    }
    return result;
}

function neighbourhoodRing(array, outerRadius, innerRadius, x, y) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let distance = Math.sqrt((j - x) ** 2 + (i - y) ** 2);
            if (distance <= outerRadius && distance >= innerRadius) {
                result.push(array[i][j]);
            }
        }
    }
    return result;
}

function neighbourhoodSector(array, radius, sectorStart, sectorEnd, x, y) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let dx = j - x;
            let dy = i - y;
            let distance = Math.sqrt(dx ** 2 + dy ** 2);
            if (distance <= radius) {
                const angle = Math.atan2(dy, dx);
                if (angle >= sectorStart && angle <= sectorEnd) {
                    result.push(array[i][j]);
                }
            }
        }
    }
    return result;
}

function determineNeighbourhoodParams(array, startX, finalX, startY, finalY, y) {
    let startingParam;
    let finalParam;
    if (y === startY && y === finalY) {
        startingParam = startX;
        finalParam = finalX;
    } else if (y === startY) {
        startingParam = startX;
        finalParam = array[y].length;
    } else if (y === finalY) {
        startingParam = 0;
        finalParam = finalX;
    } else {
        startingParam = 0;
        finalParam = array[y].length;
    }
    return [startingParam, finalParam];
}

function movingWindowRectangle(array, startX, startY, finalX, finalY, func, width, height) {
    let result = [];
    for (let y = startY; y <= finalY; y++) {
        let currentRow = [];
        let startingParam, finalParam;
        [startingParam, finalParam] = determineNeighbourhoodParams(array, startX, finalX, startY, finalY, y);
        for (let x = startingParam; x < finalParam; x++) {
            currentRow.push(func(neighbourhoodRectangle(array, width, height, x, y)));
        }
        result.push(currentRow);
    }
    return result;
}

function movingWindowCircle(array, startX, startY, finalX, finalY, func, radius) {
    let result = [];
    for (let y = startY; y <= finalY; y++) {
        let currentRow = [];
        let startingParam, finalParam;
        [startingParam, finalParam] = determineNeighbourhoodParams(array, startX, finalX, startY, finalY, y);
        for (let x = startingParam; x < finalParam; x++) {
            currentRow.push(func(neighbourhoodCircle(array, radius, x, y)));
        }
        result.push(currentRow);
    }
    return result;
}

function movingWindowRing(array, startX, startY, finalX, finalY, func, outerRadius, innerRadius) {
    let result = [];
    for (let y = startY; y <= finalY; y++) {
        let currentRow = [];
        let startingParam, finalParam;
        [startingParam, finalParam] = determineNeighbourhoodParams(array, startX, finalX, startY, finalY, y);
        for (let x = startingParam; x < finalParam; x++) {
            currentRow.push(func(neighbourhoodRing(array, outerRadius, innerRadius, x, y)));
        }
        result.push(currentRow);
    }
    return result;
}

function movingWindowSector(array, startX, startY, finalX, finalY, func, radius, sectorStart, sectorEnd) {
    let result = [];
    for (let y = startY; y <= finalY; y++) {
        let currentRow = [];
        let startingParam, finalParam;
        [startingParam, finalParam] = determineNeighbourhoodParams(array, startX, finalX, startY, finalY, y);
        for (let x = startingParam; x < finalParam; x++) {
            currentRow.push(func(neighbourhoodSector(array, radius, sectorStart, sectorEnd, x, y)));
        }
        result.push(currentRow);
    }
    return result;
}

function blockOperation(array, width, height, func) {
    let result = [];
    let leftOffset = Math.ceil(width / 2);
    let rightOffset = Math.floor(width / 2);
    let topOffset = Math.ceil(height / 2);
    let botOffset = Math.floor(height / 2);
    for (let y = topOffset; y < array.length + botOffset; y++) {
        let currentRow = [];
        for (let x = leftOffset; x < array[y].length + rightOffset; x++) {
            currentRow.push(func(neighbourhoodRectangle(array, width, height, x, y)));
        }
        result.push(currentRow);
    }
    return result;
}