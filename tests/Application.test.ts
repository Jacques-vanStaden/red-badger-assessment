import { describe, expect, it } from 'vitest';
import { run } from '../src/Application';

describe('Application', () => {
    it('produces the expected output for the sample input', () => {
        const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

        const output = run(input);

        expect(output).toBe(`1 1 E
3 3 N LOST
2 3 S`);
    });

    it('rejects a robot starting outside the grid', () => {
        const input = `5 3
9 9 N
F`;

        expect(() => run(input)).toThrow(
            'Robot starting position is outside the grid: 9,9',
        );
    });
});