import { describe, expect, it } from 'vitest';
import { Robot } from '../src/domain/Robot';

describe('Robot', () => {
    it('starts at the supplied position and orientation', () => {
        const robot = new Robot({ x: 1, y: 2 }, 'N');

        expect(robot.position).toEqual({ x: 1, y: 2 });
        expect(robot.orientation).toBe('N');
        expect(robot.isLost).toBe(false);
    });

    it('turns left', () => {
        const robot = new Robot({ x: 1, y: 2 }, 'N');

        robot.turnLeft();

        expect(robot.orientation).toBe('W');
    });

    it('turns right', () => {
        const robot = new Robot({ x: 1, y: 2 }, 'N');

        robot.turnRight();

        expect(robot.orientation).toBe('E');
    });

    it('moves to a new position', () => {
        const robot = new Robot({ x: 1, y: 2 }, 'N');

        robot.moveTo({ x: 1, y: 3 });

        expect(robot.position).toEqual({ x: 1, y: 3 });
    });

    it('can be marked as lost', () => {
        const robot = new Robot({ x: 1, y: 2 }, 'N');

        robot.markAsLost();

        expect(robot.isLost).toBe(true);
    });
});