const {neighbourhoodCircle} = require('../main');

test('picking part of radius 1 from the center of array with neighbourhoodCircle', () => {
    expect(neighbourhoodCircle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 1, 2, 2)).toStrictEqual([3, 2, 3, 4, 3]);
});

test('picking part of radius 2 from the center of array with neighbourhoodCircle', () => {
    expect(neighbourhoodCircle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 2, 2, 2)).toStrictEqual([3, 2, 3, 4, 1, 2, 3, 4, 5, 2, 3, 4, 3]);
});

test('picking part of radius 3 from the center of array with neighbourhoodCircle', () => {
    expect(neighbourhoodCircle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 3, 2, 2)).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});

test('picking part from the corner of array with neighbourhoodCircle', () => {
    expect(neighbourhoodCircle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 2, 0, 0)).toStrictEqual([1, 2, 3, 1, 2, 1]);
});

test('picking part from the opposite corner of array with neighbourhoodCircle', () => {
    expect(neighbourhoodCircle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 3, 4, 4)).toStrictEqual([5, 3, 4, 5, 3, 4, 5, 2, 3, 4, 5]);
});