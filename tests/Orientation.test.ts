import { describe, expect, it } from 'vitest';
import { turnLeft, turnRight } from '../src/domain/Orientation';

describe('Orientation', () => {
    describe('turnLeft', () => {
        it('turns north to west', () => {
            expect(turnLeft('N')).toBe('W');
        });

        it('turns west to south', () => {
            expect(turnLeft('W')).toBe('S');
        });

        it('turns south to east', () => {
            expect(turnLeft('S')).toBe('E');
        });

        it('turns east to north', () => {
            expect(turnLeft('E')).toBe('N');
        });
    });

    describe('turnRight', () => {
        it('turns north to east', () => {
            expect(turnRight('N')).toBe('E');
        });

        it('turns east to south', () => {
            expect(turnRight('E')).toBe('S');
        });

        it('turns south to west', () => {
            expect(turnRight('S')).toBe('W');
        });

        it('turns west to north', () => {
            expect(turnRight('W')).toBe('N');
        });
    });
});