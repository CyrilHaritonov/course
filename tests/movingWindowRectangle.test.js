import {movingWindowRectangle} from "../main.js";

test('moving window rectangle result on array with sum function', () => {
    expect(movingWindowRectangle([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 1, 1, 3, 3, (a) => a.reduce((acc, b) => acc + b, 0), 3, 3)).toStrictEqual(
        [[18, 27, 36, 27],
            [9, 18, 27, 36, 27],
            [9, 18, 27, 36]]);
});