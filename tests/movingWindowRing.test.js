const {movingWindowRing} = require("../main.js");
test('moving window ring result on array with sum function', () => {
    expect(movingWindowRing([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 1, 2, 3, 2, (a) => a.reduce((acc, b) => acc + b, 0), 3, 2)).toStrictEqual(
        [[37, 48, 35]]);
});