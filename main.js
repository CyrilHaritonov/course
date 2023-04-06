function neighbourhoodRectangle(array, width, height, x, y) {
    let result = [];
    let leftOffset = Math.ceil(width / 2);
    let rightOffset = Math.floor(width / 2);
    let topOffset = Math.ceil(height / 2);
    let botOffset = Math.floor(height / 2);
    for (let i = y - leftOffset; i <= y + rightOffset; i++) {
        for (let j = x - topOffset; j <= x + botOffset; j++) {
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