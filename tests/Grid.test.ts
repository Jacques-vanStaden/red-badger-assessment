import { describe, expect, it } from 'vitest';
import { Grid } from '../src/domain/Grid';

describe('Grid', () => {
    const grid = new Grid(5, 3);

    describe('contains', () => {
        it('accepts positions inside the grid', () => {
            expect(grid.contains({ x: 0, y: 0 })).toBe(true);
            expect(grid.contains({ x: 5, y: 3 })).toBe(true);
            expect(grid.contains({ x: 2, y: 1 })).toBe(true);
        });

        it('rejects positions outside the grid', () => {
            expect(grid.contains({ x: -1, y: 0 })).toBe(false);
            expect(grid.contains({ x: 0, y: -1 })).toBe(false);
            expect(grid.contains({ x: 6, y: 3 })).toBe(false);
            expect(grid.contains({ x: 5, y: 4 })).toBe(false);
        });
    });

    describe('scents', () => {
        it('has no scent at a new position', () => {
            expect(grid.hasScent({ x: 3, y: 2 })).toBe(false);
        });

        it('can add and detect a scent', () => {
            grid.addScent({ x: 3, y: 2 });

            expect(grid.hasScent({ x: 3, y: 2 })).toBe(true);
        });

        it('does not confuse different positions', () => {
            grid.addScent({ x: 3, y: 2 });

            expect(grid.hasScent({ x: 2, y: 3 })).toBe(false);
        });
    });
});

it('rejects negative grid dimensions', () => {
    expect(() => new Grid(-1, 3)).toThrow(
        'Grid dimensions cannot be negative',
    );
});