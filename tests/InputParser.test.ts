import { describe, expect, it } from 'vitest';
import { parseInput } from '../src/InputParser';

describe('InputParser', () => {
    it('parses the sample input', () => {
        const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

        expect(parseInput(input)).toEqual({
            maxX: 5,
            maxY: 3,
            robots: [
                {
                    position: { x: 1, y: 1 },
                    orientation: 'E',
                    instructions: 'RFRFRFRF',
                },
                {
                    position: { x: 3, y: 2 },
                    orientation: 'N',
                    instructions: 'FRRFLLFFRRFLL',
                },
                {
                    position: { x: 0, y: 3 },
                    orientation: 'W',
                    instructions: 'LLFFFLFLFL',
                },
            ],
        });
    });

    it('rejects empty input', () => {
        expect(() => parseInput('')).toThrow('Input cannot be empty');
    });

    it('rejects incomplete robot input', () => {
        expect(() => parseInput(`5 3
1 1 E`)).toThrow('Invalid robot input');
    });

    it('rejects invalid grid dimensions', () => {
        expect(() => parseInput('abc 3')).toThrow('Invalid integer: abc');
    });

    it('rejects invalid robot coordinates', () => {
        const input = `
            5 3
            abc 1 E
            F
        `;

        expect(() => parseInput(input)).toThrow('Invalid integer: abc');
    });

    it('rejects invalid robot orientation', () => {
        const input = `
            5 3
            1 1 X
            F
        `;

        expect(() => parseInput(input)).toThrow('Invalid orientation: X');
    });

    it('rejects a robot with a missing instruction line', () => {
        const input = `5 3
        1 1 E
        3 2 N
        F`;

        expect(() => parseInput(input)).toThrow('Invalid robot input');
    });

    it('rejects an empty instruction line', () => {
        const input = `5 3
        1 1 E

        3 2 N
        F`;

        expect(() => parseInput(input)).toThrow('Invalid robot input');
    });
});