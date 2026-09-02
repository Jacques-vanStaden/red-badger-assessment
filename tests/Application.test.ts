import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { run } from '../src/Application';

const dataDirectory = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');

function readSample(fileName: string): string {
    return readFileSync(join(dataDirectory, fileName), 'utf8')
        .replace(/\r\n/g, '\n')
        .trim();
}

describe('Application', () => {
    it('produces the expected output for the sample input', () => {
        const input = readSample('sample-input.txt');
        const expected = readSample('sample-output.txt');

        expect(run(input)).toBe(expected);
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