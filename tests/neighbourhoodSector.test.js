const {neighbourhoodSector} = require("../main.js");
test('picking lower part from the center of array with neighbourhoodCircle', () => {
    expect(neighbourhoodSector(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 2, 0, 3.15, 2, 2)).toStrictEqual([1, 2, 3, 4, 5, 2, 3, 4, 3]);
});

test('picking upper part from the center of array with neighbourhoodCircle', () => {
    expect(neighbourhoodSector(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 2, 3.15, 6.3, 2, 2)).toStrictEqual([3, 2, 3, 4]);
});