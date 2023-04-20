import {blockOperation} from "../main.js";

test('block operation test multiple blocks', () => {
   expect(blockOperation([[1, 2, 3, 4, 5],
       [1, 2, 3, 4, 5],
       [1, 2, 3, 4, 5],
       [1, 2, 3, 4, 5],
       [1, 2, 3, 4, 5]], 3, 3, (a) => a.reduce((acc, b) => acc + b, 0))).toStrictEqual([[18, 27], [12, 18]]);
});

test('block operation test block sized as whole array', () => {
    expect(blockOperation([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 5, 5, (a) => a.reduce((acc, b) => acc + b, 0))).toStrictEqual([[75]]);
});

test('block operation test block sized bigger than array', () => {
    expect(blockOperation([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 10, 10, (a) => a.reduce((acc, b) => acc + b, 0))).toStrictEqual([[75]]);
});

test('block operation test block sized as one element of array', () => {
    expect(blockOperation([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 1, 1, (a) => a.reduce((acc, b) => acc + b, 0))).toStrictEqual([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]]);
});