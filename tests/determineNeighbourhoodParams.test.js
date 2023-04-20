import {determineNeighbourhoodParams} from "../main.js";
test('determine params from first row to last row', () => {
    expect(determineNeighbourhoodParams([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 2, 2, 0, 4,  1)).toStrictEqual([0, 4]);
});

test('determine params from first row to last row', () => {
    expect(determineNeighbourhoodParams([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 2, 2, 0, 4,  0)).toStrictEqual([2, 4]);
});

test('determine params from first row to last row', () => {
    expect(determineNeighbourhoodParams([[1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]], 2, 2, 0, 4,  4)).toStrictEqual([0, 2]);
});