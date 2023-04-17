const {movingWindowSector} = require("../main.js");
test('moving window rectangle result on array with sum function', () => {
    expect(movingWindowSector([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 1, 2, 3, 2, (a) => a.reduce((acc, b) => acc + b, 0), 3, 3.15, 6.3)).toStrictEqual(
        [[20, 30, 28]]);
});