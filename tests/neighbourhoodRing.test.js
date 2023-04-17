const {neighbourhoodRing} = require("../main.js");
test('picking part from the center of the array with neighbourhoodRing', () => {
        expect(neighbourhoodRing(
            [[1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5]], 3, 2, 2, 2)).toStrictEqual([1, 2, 3, 4, 5, 1, 5, 1, 5, 1, 5, 1, 2, 3, 4, 5]);
});