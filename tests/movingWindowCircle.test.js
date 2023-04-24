import {movingWindowCircle} from "../main.js";

test('moving window circle result on array with sum function', () => {
    expect(movingWindowCircle([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 1, 1, 3, 3, (a) => a.reduce((acc, b) => acc + b, 0), 1)).toStrictEqual(
        [[10, 15, 20, 19],
            [5, 10, 15, 20, 19],
            [5, 10, 15, 20]]);
});

test('moving window circle result on one line of array with sum function', () => {
    expect(movingWindowCircle([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 1, 1, 3, 1, (a) => a.reduce((acc, b) => acc + b, 0), 1)).toStrictEqual(
        [[10, 15, 20]]);
});