import {neighbourhoodRectangle} from "../main";

test('picking part from array with neighbourhoodRectangle', () => {
    expect(neighbourhoodRectangle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 3, 3, 2, 2)).toStrictEqual([2, 3, 4, 2, 3, 4, 2, 3, 4]);
});

test('picking part from the corner of array with neighbourhoodRectangle', () => {
    expect(neighbourhoodRectangle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 3, 3, 0, 0)).toStrictEqual([1, 2, 1, 2]);

});

test('picking part from the opposite corner of array with neighbourhoodRectangle', () => {
    expect(neighbourhoodRectangle(
        [[1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]], 3, 3, 5, 5)).toStrictEqual([5]);

});